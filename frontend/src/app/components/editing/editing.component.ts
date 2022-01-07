import {Component, Input, NgZone, OnInit} from '@angular/core';
import {Post} from "../../models/post";
import {Subscription} from "rxjs";
import {PostsService} from "../../services/posts.service";
import {Router} from "@angular/router";
// @ts-ignore
import * as mapboxgl from "mapbox-gl";
// @ts-ignore
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {FileUploader, FileUploaderOptions, ParsedResponseHeaders} from "ng2-file-upload";
import {CloudinaryModule} from "@cloudinary/ng";
import {HttpClientModule} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {fill} from '@cloudinary/url-gen/actions/resize';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.css']
})
export class EditingComponent implements OnInit {
  img: CloudinaryImage;
  private childparamsSub: Subscription;
  newPost: Post = new Post();

  editTitle: string = 'card title';
  editDescription: string = 'here comes the description';

  cardColor = '#FE5F38'


  imageSrc: string | ArrayBuffer;
  map: mapboxgl.map;

  @Input()
  responses: Array<any>;

  private cloudinary: Cloudinary

  private hasBaseDropZoneOver: boolean = false;
  private uploader: FileUploader;
  private title: string;


  constructor(private postService: PostsService, private route: Router, private auth: AuthService,
              private zone: NgZone,
              public http: HttpClient) {
    this.responses = [];
  }


   eventListen(){
    const url = "https://api.cloudinary.com/v1_1/hogeschool-van-amsterdam/upload";
    const form = document.querySelector("form");
    // @ts-ignore
    const files = document.querySelector("[type=file]").files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      fetch(url, {
        method: "POST",
        body: formData
      })
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          document.getElementById("data").innerHTML += data;
        });
    }
  };

  ngOnInit(): void {

    // this.loadCloudinary();
    // mapboxgl.accessToken = 'pk.eyJ1IjoiaGFubmF0b2VuYnJla2VyIiwiYSI6ImNrdXdzMjNhdTF6cHAydmxuenY3ODQ3djkifQ.X7LsiDBkUfz7vn7LfkUvKQ';
    // this.map = new mapboxgl.Map({
    //   style: 'mapbox://styles/mapbox/outdoors-v11',
    //   center: [4.897070, 50.877956],
    //   zoom: 5.5,
    //   container: 'map-mapbox',
    // });
    //
    // const nav = new mapboxgl.NavigationControl();
    // this.map.addControl(nav, 'top-left');
    //
    // this.map.addControl(
    //   new MapboxGeocoder({
    //     accessToken: 'pk.eyJ1IjoiaGFubmF0b2VuYnJla2VyIiwiYSI6ImNrdXdzMjNhdTF6cHAydmxuenY3ODQ3djkifQ.X7LsiDBkUfz7vn7LfkUvKQ',
    //     mapboxgl: mapboxgl
    //   })
    // );
    //
    // this.map.addControl(
    //   new mapboxgl.GeolocateControl({
    //     positionOptions: {
    //       enableHighAccuracy: true
    //     },
    //     // When active the map will receive updates to the device's location as it changes.
    //     trackUserLocation: true,
    //     // Draw an arrow next to the location dot to indicate which direction the device is heading.
    //     showUserHeading: true
    //   })
    // );
    //
    // let marker: any = null;
    // this.map.on('click', (e: any) => {
    //     // `e.lngLat` is the longitude, latitude geographical position of the event.
    //   console.log(e.lngLat);
    //   console.log(e.lngLat.lat);
    //   console.log(e.lngLat.lng);
    //     if (marker != null) {
    //       // @ts-ignore
    //       marker.remove()
    //     }
    //   marker = new mapboxgl.Marker()
    //     .setLngLat(e.lngLat.wrap())
    //     .addTo(this.map);
    // });

    // 2. Set your cloud name
    //========================

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'hogeschool-van-amsterdam'
      }
    });


    // 3. Get your image
    //===================

    // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
    this.img = cld.image('sample.jpg');


    // 4. Transform your image
    //=========================

    // Resize to 250 x 250 pixels using the 'fill' crop mode.
    this.img.resize(fill().width(250).height(250));


    // newly added
    const uploaderOptions: FileUploaderOptions = {}
  }
}



  //
  // loadCloudinary() {
  //   const uploaderOptions: FileUploaderOptions = {
  //     url: `https://api.cloudinary.com/v1_1/hogeschool-van-amsterdam/upload`,
  //     // Upload files automatically upon addition to upload queue
  //     autoUpload: true,
  //     // Use xhrTransport in favor of iframeTransport
  //     isHTML5: true,
  //     // Calculate progress independently for each uploaded file
  //     removeAfterUpload: true,
  //     // XHR request headers
  //     headers: [
  //       {
  //         name: 'X-Requested-With',
  //         value: 'XMLHttpRequest'
  //       }
  //     ]
  //   };

  // readURL(event: any): void {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files[0];
  //
  //     const reader = new FileReader();
  //     reader.onload = e => this.imageSrc = reader.result;
  //
  //     reader.readAsDataURL(file);
  //   }
  // }
  //
  // backButton(){
  //   if (confirm("do you want to discard changes")) {
  //     this.route.navigateByUrl('rec-done')
  //   }
  // }
  //
  // postButton(){
  //   this.postService.restCreateNewPost(this.newPost).subscribe(
  //     (data) => {
  //      console.log(data);
  //     },
  //     (error) => console.log("Error: " + error.status + " - " + error.error)
  //   );
  // }
  //
  //
  // getSelectedColor(){
  //   return this.cardColor;
  // }


