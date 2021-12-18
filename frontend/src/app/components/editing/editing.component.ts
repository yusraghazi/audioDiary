import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/post";
import {Subscription} from "rxjs";
import {PostsService} from "../../services/posts.service";
import {Router} from "@angular/router";
// @ts-ignore
import * as mapboxgl from "mapbox-gl";
// @ts-ignore
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.css']
})
export class EditingComponent implements OnInit {
private childparamsSub: Subscription;
  newPost: Post;

  editTitle: string = 'card title';
  editDescription: string = 'here comes the description';

  cardColor = '#FE5F38'

  imageSrc: string | ArrayBuffer;
  map: mapboxgl.map;

  constructor(private postService: PostsService, private route: Router) { }

  ngOnInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGFubmF0b2VuYnJla2VyIiwiYSI6ImNrdXdzMjNhdTF6cHAydmxuenY3ODQ3djkifQ.X7LsiDBkUfz7vn7LfkUvKQ';
    this.map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [4.897070, 50.877956],
      zoom: 5.5,
      container: 'map-mapbox',
    });

    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'top-left');

    this.map.addControl(
      new MapboxGeocoder({
        accessToken: 'pk.eyJ1IjoiaGFubmF0b2VuYnJla2VyIiwiYSI6ImNrdXdzMjNhdTF6cHAydmxuenY3ODQ3djkifQ.X7LsiDBkUfz7vn7LfkUvKQ',
        mapboxgl: mapboxgl
      })
    );

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
      })
    );

    let marker: any = null;
    this.map.on('click', (e: any) => {
        // `e.lngLat` is the longitude, latitude geographical position of the event.
      console.log(e.lngLat);
      console.log(e.lngLat.lat);
      console.log(e.lngLat.lng);
        if (marker != null) {
          // @ts-ignore
          marker.remove()
        }
      marker = new mapboxgl.Marker()
        .setLngLat(e.lngLat.wrap())
        .addTo(this.map);
    });
  }

  url: any; //Angular 11, for stricter type
  msg = "";

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }


  createNewPost(id: number) {
    this.postService.restCreateNewPost(id).subscribe(
      (data) => {
        this.newPost = data; console.log(data);
      },
      (error) => console.log("Error: " + error.status + " - " + error.error)
    );
  }

  backButton(){
    if (confirm("do you want to discard changes")) {
      this.route.navigateByUrl('rec-done')
    }
  }

  postButton(){
    this.route.navigateByUrl('feedview');
  }


  getSelectedColor(){
    return this.cardColor;
  }

}
