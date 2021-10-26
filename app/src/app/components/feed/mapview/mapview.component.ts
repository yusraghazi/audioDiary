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
  places: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.places = {
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
        },
        {
          'type': 'Feature',
          'properties': {
            'iconSize': [20, 20],
            'color': 'yellow'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [6.2167070, 52.377956]
          }
        },
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
    const filterGroup = document.getElementById('filter-group');

    this.map.on('load', () => {

      this.map.addSource('places', {
        'type': 'geojson',
        'data': this.places
      });

      for (const feature of this.places.features) {
        const symbol = feature.properties.color;
        const layerID = `poi-${symbol}`;

        if (!this.map.getLayer(layerID)) {
          this.map.addLayer({
            'id': layerID,
            'type': 'circle',
            'source': 'places',
            'paint': {
              'circle-color': symbol,
              'circle-radius': 10,
            },
            'filter': ['==', 'color', symbol]
          });

          const input = document.createElement('input');
          input.type = 'checkbox';
          input.id = layerID;
          input.checked = true;
          filterGroup.appendChild(input);

          const label = document.createElement('label');
          label.setAttribute('for', layerID);
          label.textContent = symbol;
          filterGroup.appendChild(label);

          input.addEventListener('change', (e) => {
            this.map.setLayoutProperty(
              layerID,
              'visibility',
              // @ts-ignore
              e.target.checked ? 'visible' : 'none'
            );
          });
        }


        // @ts-ignore
        this.map.on('click', layerID, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`<div class="card">
                <img class="card-img-top" <div class="postCard" [ngStyle]="{\'background-color\':audioPost.theme}">
            <img class="shadow-lg card-img-top" src="../../../../assets/img/postsimgs/{{audioPost.img}}">
            <div class="card-body">
            <div class=" shadow-lg title-container">
            <h5 class="card-title"> {{audioPost.title}}</h5>
            </div>
            <div class="shadow-lg text-container">
            <p class="card-text">{{audioPost.description}}</p>
            </div>
            <div class="icons">
            <i *ngIf="audioPost.isLiked" (click)="audioPost.isLiked = false" class="bi bi-heart-fill"></i>
            <i *ngIf="!audioPost.isLiked" (click)="audioPost.isLiked = true" class="bi bi-heart"></i>
            <i class="bi bi-chat-dots-fill"></i>
            <i class="bi bi-share-fill"></i>
            <i class="bi bi-flag-fill"></i>
            </div>
            <div class="reportFlag">
            </div>
            </div>`)
            .addTo(this.map);
        });
      }
    });
  }



}
