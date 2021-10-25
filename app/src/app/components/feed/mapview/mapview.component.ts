import {AfterViewInit, Component, OnInit} from '@angular/core';

// @ts-ignore
import H from '@here/maps-api-for-javascript';
// @ts-ignore
import * as mapboxgl from "mapbox-gl";
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})

export class MapviewComponent implements OnInit, AfterViewInit {

  map: mapboxgl.map;
  geojson: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.geojson = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {
            'iconSize': [20, 20],
            'color': 'green'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [4.897070, 52.45667]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'iconSize': [20, 20],
            'color': 'blue'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [4.82456, 52.377956]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'iconSize': [20, 20],
            'color': 'yellow'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [4.997070, 52.377956]
          }
        }
      ]
    };

    mapboxgl.accessToken = environment.mapboxKey;
    this.map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: [4.897070, 52.377956],
      zoom: 15.5,
      container: 'map-mapbox',
    });

    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'top-left');

    for (const marker of this.geojson.features) {
      const el = document.createElement('div');
      const width = marker.properties.iconSize[0];
      const height = marker.properties.iconSize[1];
      el.className = 'marker';
      el.style.backgroundColor = marker.properties.color;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundSize = '100%';
      el.style.borderRadius = "50%";
      el.style.borderColor = "white";

      el.addEventListener('click', () => {
        if (el.innerHTML === "") {
          el.innerHTML = '<div class="card" style="width: 18rem;">\n' +
            '  <img class="card-img-top" s<div class="postCard" [ngStyle]="{\'background-color\':audioPost.theme}">\n' +
            '  <img class="shadow-lg card-img-top" src="../../../../assets/img/postsimgs/{{audioPost.img}}">\n' +
            '  <div class="card-body">\n' +
            '    <div class=" shadow-lg title-container">\n' +
            '    <h5 class="card-title"> {{audioPost.title}}</h5>\n' +
            '    </div>\n' +
            '    <div class="shadow-lg text-container">\n' +
            '    <p class="card-text">{{audioPost.description}}</p>\n' +
            '    </div>\n' +
            '    <div class="icons">\n' +
            '    <i *ngIf="audioPost.isLiked" (click)="audioPost.isLiked = false" class="bi bi-heart-fill"></i>\n' +
            '    <i *ngIf="!audioPost.isLiked" (click)="audioPost.isLiked = true" class="bi bi-heart"></i>\n' +
            '    <i class="bi bi-chat-dots-fill"></i>\n' +
            '    <i class="bi bi-share-fill"></i>\n' +
            '      <i class="bi bi-flag-fill"></i>\n' +
            '\n' +
            '    </div>\n' +
            '    <div class="reportFlag">\n' +
            '    </div>\n' +
            '  </div>\n' +
            '\n' +
            '</div>src="..." alt="Card image cap">\n' +
            '  <div class="card-body">\n' +
            '    <h5 class="card-title">Card title</h5>\n' +
            '    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p>\n' +
            '    <a href="#" class="btn btn-primary">Go somewhere</a>\n' +
            '  </div>\n' +
            '</div>';
          el.style.zIndex = String(2);
        } else {
          el.innerHTML = "";
          el.style.zIndex = String(1);
        }
      });

      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(this.map);
    }
  }



}
