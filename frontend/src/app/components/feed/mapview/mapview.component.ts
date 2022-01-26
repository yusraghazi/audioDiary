import {AfterViewInit, Component, Input, OnInit, Output} from '@angular/core';

// @ts-ignore
import H from '@here/maps-api-for-javascript';
// @ts-ignore
import mapboxgl from "mapbox-gl";
// @ts-ignore
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {Post} from "../../../models/post";
import {PostsService} from "../../../services/posts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Theme} from "../../../enums/theme";

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})

export class MapviewComponent implements OnInit, AfterViewInit {

  map: mapboxgl.map;
  places: any;
  posts: Post[] = [];
  theme: Theme = Theme.CITY;
  popupTheme: string;
  themesList: Theme[] = [];
  id: number = 0;
  popularThemes: unknown = null;
  themeValue: string = "";

  @Output()
  feedview: string = "Feedview";

  @Input()
  showOverlay: boolean = false;

  constructor(private postsService: PostsService , private router: Router,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // creating GEOjson data
    this.places = {"type": "FeatureCollection", "features": []};
    this.postsService.restGetPosts().subscribe(
      (data) => {
        this.posts = data;
        JSON.parse(JSON.stringify(data));
        for (let point of data) {
          let coordinate = [point.lng, point.lat];
          let feature = {"type": "Feature", "geometry": {"type": "Point", "coordinates": coordinate}, "properties": point}
          this.places.features.push(feature);
        }
      },
      (error) => console.log("Error: " + error.status + " - " + error.error)
    );
    document.addEventListener('DOMContentLoaded', () => {
      this.ngAfterViewInit();
    });
  }

  ngAfterViewInit() {
    // initialising map
      mapboxgl.accessToken = 'pk.eyJ1IjoiaGFubmF0b2VuYnJla2VyIiwiYSI6ImNrdXdzMjNhdTF6cHAydmxuenY3ODQ3djkifQ.X7LsiDBkUfz7vn7LfkUvKQ';
      this.map = new mapboxgl.Map({
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [4.897070, 50.877956],
        zoom: 5.5,
        container: 'map-mapbox',
      });

      // adding search and location controls to the map
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

      const filterGroup = document.getElementById('filter-group');

      this.map.on('load', async () => {

        // loading in the geojson data I have created before
        this.map.addSource('places', {
          'type': 'geojson',
          'data': this.places
        });

        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });

        // user can specify their audio by adding a theme to their audio post
        // create a filter by creating a layer for each theme
        for (const feature of this.places.features) {
          const symbol = feature.properties.theme;
          const layerID = `poi-${symbol}`;
          if (!this.map.getLayer(layerID)) {
            this.map.addLayer({
              'id': layerID,
              'type': 'circle',
              'source': 'places',
              'paint': {
                'circle-color': await this.getTheme(feature.properties.theme),
                'circle-stroke-color': 'white',
                'circle-radius': 10,
              },
              'filter': ['==', 'theme', symbol]
            });

            // filling the html with al the different themes
            const container = document.createElement('div');
            container.className = "form-check form-check-inline";

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.className = 'm-1';
            input.id = layerID;
            input.checked = true;
            container.appendChild(input);

            const label = document.createElement('label');
            label.setAttribute('for', layerID);
            label.textContent = symbol;
            label.className = "mr-3";

            container.appendChild(label);
            filterGroup.appendChild(container);

            // set visibility of the different layers based on the checkboxes
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
          this.map.on('mouseenter', layerID, (e) => {

            // navigate to child component
            this.map.on('click', layerID, (e: { features: { properties: { id: number; }; }[]; }) => {
              this.id = e.features[0].properties.id;
              this.openOverlay(e.features[0].properties.id);
            });

            this.map.getCanvas().style.cursor = 'pointer';

            this.map.flyTo({
              center: e.features[0].geometry.coordinates
            });

            const coordinates = e.features[0].geometry.coordinates.slice();
            const title = e.features[0].properties.title;
            const description = e.features[0].properties.description;

            popup
              .setLngLat(coordinates)
              .setHTML(`<strong>${title}</strong>
                      <p>${description}</p>`)
              .addTo(this.map);
          });

          this.map.on('mouseleave', layerID, () => {
            this.map.getCanvas().style.cursor = '';
            popup.remove();
          });
        }
      });
  }


  /**
   * Getting the top 5 used themes from the database in descending order
   */
  async getMostPopularThemes() {
    await this.postsService.getTopFiveThemes().then(result => {
      this.popularThemes = result;
      this.themeValue = this.theme;
    });
  }

  /**
   * See if the theme matches with one of the top five themes and assign it its corresponding color.
   * @param theme the theme value of the current audio post
   */
  async getTheme(theme: string) {
    await this.getMostPopularThemes();
      switch (theme) {
        // @ts-ignore
        case this.popularThemes[0][0]:
          this.theme = Theme.SUN;
          break;
        // @ts-ignore
        case this.popularThemes[1][0]:
          this.theme = Theme.SAND;
          break;
        // @ts-ignore
        case this.popularThemes[2][0]:
          this.theme = Theme.FOREST;
          break;
        // @ts-ignore
        case this.popularThemes[3][0]:
          this.theme = Theme.WATER;
          break;
        // @ts-ignore
        case this.popularThemes[4][0]:
          this.theme = Theme.MOUNTAIN;
          break;
        default:
          this.theme = Theme.CITY;
          break;
      }
    return this.theme;
    }


  /**
   * navigate to a single audio post
   * @param pId the id of the audio post/the parameter to give to the router
   */
  async openOverlay(pId: number) {
    await this.router.navigate([pId], {relativeTo: this.activatedRoute});
  }

}
