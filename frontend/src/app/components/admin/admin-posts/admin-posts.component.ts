import { Component, OnInit } from '@angular/core';
import Chart from "chart.js/auto";
// @ts-ignore
import mapboxgl from "mapbox-gl";
// @ts-ignore
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {Post} from "../../../models/post";
import {Theme} from "../../../enums/theme";
import {PostsService} from "../../../services/posts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-admin-location',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.css']
})
export class AdminPostsComponent implements OnInit {

  chart: Chart
  type: string = 'bar'
  data: any;
  map: mapboxgl.map;

  places: any;
  posts: Post[] = [];
  reportedPosts: Post[] = [];
  theme: Theme;
  currentAdmin: User;

  constructor(private postsService: PostsService, private authService: AuthService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getPosts();
    this.checkAdminOrResearch();
    this.data = {
      labels: ['Posts today'],
      datasets: [{
        label: 'Amount of posts',
        data: [820],
        // @ts-ignore
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        // @ts-ignore
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      }
      ]
    }

    this.places = {"type": "FeatureCollection", "features": []};
    this.postsService.restGetPosts().subscribe(
      (data) => {
        //this.posts = data;
        this.posts = data;
        JSON.parse(JSON.stringify(data));

        for (let point of data) {
          let coordinate = [point.lng, point.lat];
          let feature = {"type": "Feature", "geometry": {"type": "Point", "coordinates": coordinate}, "properties": point}
          this.places.features.push(feature);
        }
        // @ts-ignore
        // this.places = GeoJSON.parse(JSON.stringify(data));
      },
      (error) => console.log("Error: " + error.status + " - " + error.error)
    );

    mapboxgl.accessToken = 'pk.eyJ1IjoiaGFubmF0b2VuYnJla2VyIiwiYSI6ImNrdXdzMjNhdTF6cHAydmxuenY3ODQ3djkifQ.X7LsiDBkUfz7vn7LfkUvKQ';
    this.map = new mapboxgl.Map({
      container: 'map-mapbox',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [9.0000, 53.0000],
      zoom: 3
    });

    this.map.on('load', () => {
// Add a new source from our GeoJSON data and
// set the 'cluster' option to true. GL-JS will
// add the point_count property to your source data.
      this.map.addSource('posts', {
        type: 'geojson',
// Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
// from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: this.places,
        cluster: true,
        clusterMaxZoom: 1, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });

      this.map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'posts',
        filter: ['has', 'point_count'],
        paint: {
// Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
// with three steps to implement three types of circles:
//   * Blue, 20px circles when point count is less than 100
//   * Yellow, 30px circles when point count is between 100 and 750
//   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40
          ]
        }
      });

      this.map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'posts',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      });

      this.map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'posts',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      });

// inspect a cluster on click
      this.map.on('click', 'clusters', (e: any) => {
        const features = this.map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        this.map.getSource('posts').getClusterExpansionZoom(
          clusterId,
          (err: any, zoom: any) => {
            if (err) return;

            this.map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom
            });
          }
        );
      });

// When a click event occurs on a feature in
// the unclustered-point layer, open a popup at
// the location of the feature, with
// description HTML from its properties.
      this.map.on('click', 'unclustered-point', (e: any) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const mag = e.features[0].properties.mag;
        const tsunami =
          e.features[0].properties.tsunami === 1 ? 'yes' : 'no';

// Ensure that if the map is zoomed out such that
// multiple copies of the feature are visible, the
// popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`
          )
          .addTo(this.map);
      });

      this.map.on('mouseenter', 'clusters', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });
      this.map.on('mouseleave', 'clusters', () => {
        this.map.getCanvas().style.cursor = '';
      });
    });

  }

  changeChart(date: string) {
    this.chart.destroy();

    let labels = {};

    if (date == 'day') {
      labels = ['Posts today'];
      this.type = 'bar';
      this.data = {
        labels: labels,
        datasets: [{
          label: 'Amount of posts',
          data: [820],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }
        ]
      }
    } else if (date == 'week') {
      this.type = 'line';
      labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      this.data = {
        labels: labels,
        datasets: [{
          label: 'Amount of posts',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };
    } else if (date == 'month') {
      this.type = 'line';
      labels = ['Week 40', 'Week 41', 'Week 42', 'Week 43'];
      this.data = {
        labels: labels,
        datasets: [{
          label: 'Amount of posts',
          data: [299, 159, 180, 302],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };
    }
    const ctx = document.getElementById('chart');
    // @ts-ignore
    this.chart = new Chart(ctx, {
      type: this.type,
      data: this.data,
    });
  }

  getPosts() {
    this.postsService.getReportedPosts().subscribe(
      (data) => {
        // @ts-ignore
        this.reportedPosts = data; console.log(data);
      },
      (error) => console.log("Error: " + error.status + " - " + error.error)
    );
  }

  deletePosts(postId: number): void{
    this.postsService.restDeletePosts(postId).subscribe(
      (response) =>{
        this.posts.splice(postId,1);
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  downloadObjectAsJson() {
    delete this.places['user'];
    delete this.places['audio'];
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.places));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "GEO.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  checkAdminOrResearch() {
    let user = this.userService.restGetUser(this.authService.getUser().email)
    user.pipe().subscribe(
      (data) => {
        this.currentAdmin = data;
      }
    )
  }
}
