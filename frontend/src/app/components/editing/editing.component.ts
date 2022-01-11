import {Component, Input, NgZone, OnInit} from '@angular/core';
import {Post} from "../../models/post";
import {Subscription} from "rxjs";
import {PostsService} from "../../services/posts.service";
import {Router} from "@angular/router";
// @ts-ignore
import mapboxgl from "mapbox-gl";
// @ts-ignore
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders} from "ng2-file-upload";
import {CloudinaryModule} from "@cloudinary/ng";
import {HttpClientModule} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
import {Cloudinary, CloudinaryImage, CloudinaryVideo} from "@cloudinary/url-gen";
import {fill, scale} from '@cloudinary/url-gen/actions/resize';
import {videoCodec} from "@cloudinary/url-gen/actions/transcode";
import {auto} from "@cloudinary/url-gen/qualifiers/dpr";
import * as RecordRTC from "recordrtc";
import {DomSanitizer} from "@angular/platform-browser";





@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.css']
})
export class EditingComponent implements OnInit {
  img: CloudinaryImage;
  vid: CloudinaryVideo;
  private childparamsSub: Subscription;
  newPost: Post = new Post();

  editTitle: string = 'card title';
  editDescription: string = 'here comes the description';
  cardColor = '#FE5F38'
  imageSrc: string | ArrayBuffer;
  map: mapboxgl.map;
  lng: number;
  lat: number;
  location: string;
  private errorMessage: string;



  // newly added
  public record:any;
  //Will use this flag for detect recording
  public recording = false;
  //Url of Blob
  public url:any;
  public error:any;
  showRecordBtn: boolean = true;

  value = './assets/img/rec-button.png'; //default_value
  // constructor(private audioRecorderService: NgAudioRecorderService, private router: Router, private activatedRoute: ActivatedRoute) {
  //   this.audioRecorderService.recorderError.subscribe(recorderErrorCase => {
  //     // Handle Error
  //   })


  @Input()
  responses: Array<any>;



  private cloudinary: Cloudinary

  private hasBaseDropZoneOver: boolean = false;
  private uploader: FileUploader;
  private title: string;


  constructor(private postService: PostsService, private route: Router, private auth: AuthService,
              private zone: NgZone,
              public http: HttpClient, private domSanitizer: DomSanitizer) {
    this.responses = [];
  }

  sanitize(url:string){
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  initiateRecording() {

    this.recording = true;
    let mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));

  }




  /**
   * Will be called automatically.
   */
  successCallback(stream:any) {
    var options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1
    };
    //Start Actual Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
  }
  /**
   * processRecording Do what ever you want with blob
   * @param  {any} blob Blog
   */
  processRecording(blob:any) {
    this.url = URL.createObjectURL(blob);
    console.log(blob);
    const file = new File([blob], 'audio.mp3', { type: blob.type })


    let container = new DataTransfer();
    container.items.add(file);
    (<HTMLInputElement>document.getElementById('fileInput')).files = container.files;
  }
  /**
   * Process Error.
   */
  errorCallback(error:any) {
    this.error = 'Can not play audio in your browser';
  }

  backButton(){
    if (confirm("do you want to discard changes")) {
      this.route.navigateByUrl('rec-done')
    }
  }

  postButton(){
    this.postService.restCreateNewPost(this.newPost).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log("Error: " + error.status + " - " + error.error)
    );
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }


  getSelectedColor(){
    return this.cardColor;
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
      formData.append("public_id", "5");

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
    this.img = cld.image('1');
    this.vid = cld.video("bensound-creativeminds_chahmj");

    this.vid.resize(scale().width(400));
    this.vid.toURL();

    // 4. Transform your image
    //=========================

    // Resize to 250 x 250 pixels using the 'fill' crop mode.
    this.img.resize(fill().width(250).height(250));


    // newly added
    const uploaderOptions: FileUploaderOptions = {}



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
      console.log(e);
      this.newPost.lng = e.lngLat.lng;
      this.newPost.lat = e.lngLat.lat;

      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", "https://api.mapbox.com/geocoding/v5/mapbox.places/" + e.lngLat.lng + "," + e.lngLat.lat + ".json?access_token=pk.eyJ1IjoiaGFubmF0b2VuYnJla2VyIiwiYSI6ImNrdXdzMjNhdTF6cHAydmxuenY3ODQ3djkifQ.X7LsiDBkUfz7vn7LfkUvKQ", false ); // false for synchronous request
      xmlHttp.send( null );
      this.newPost.location = JSON.parse(xmlHttp.responseText).features[0].place_name;

      if (marker != null) {
        // @ts-ignore
        marker.remove()
      }
      marker = new mapboxgl.Marker()
        .setLngLat(e.lngLat.wrap())
        .addTo(this.map);
    });
  }




}
