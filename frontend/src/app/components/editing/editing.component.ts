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
import {Cloudinary} from "@cloudinary/angular-5.x";
import {HttpClientModule} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.css']
})
export class EditingComponent implements OnInit {
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

  public hasBaseDropZoneOver: boolean = false;
  public uploader: FileUploader;
  private title: string;

  constructor(private postService: PostsService, private route: Router, private auth: AuthService,
              private zone: NgZone,
              public http: HttpClient) {
    this.responses = [];
    this.title = '';
  }

  ngOnInit(): void {
    this.loadCloudinary();
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
  }

  url: any; //Angular 11, for stricter type
  msg = "";

  loadCloudinary() {
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/hogeschool-van-amsterdam/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };

    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      // Add built-in and custom tags for displaying the uploaded photo in the list
      let tags = 'myphotoalbum';
      if (this.title) {
        form.append('context', `photo=${this.title}`);
        tags = `myphotoalbum,${this.title}`;
      }
      // Upload to a custom folder
      // Note that by default, when uploading via the API, folders are not automatically created in your Media Library.
      // In order to automatically create the folders based on the API requests,
      // please go to your account upload settings and set the 'Auto-create folders' option to enabled.
      form.append('folder', 'angular_sample');
      // Add custom tags
      form.append('tags', tags);
      // Add file to upload
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    // Insert or update an entry in the responses array
    const upsertResponse = (fileItem: { file: any; status?: number; data?: any; progress?: any; }) => {

      // Run the update in a custom zone since for some reason change detection isn't performed
      // as part of the XHR request to upload the files.
      // Running in a custom zone forces change detection
      this.zone.run(() => {
        // Update an existing entry if it's upload hasn't completed yet

        // Find the id of an existing item
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          // Update existing item with new data
          this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
        } else {
          // Create new response
          this.responses.push(fileItem);
        }
      });
    };

    // Update model on completion of uploading a file
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
      upsertResponse(
        {
          file: item.file,
          status,
          data: JSON.parse(JSON.stringify(response))
        }
      );

    // Update model on upload progress event
    this.uploader.onProgressItem = (fileItem: any, progress: any) =>
      upsertResponse(
        {
          file: fileItem.file,
          progress,
          data: {}
        }
      );
  }

  updateTitle(value: string) {
    this.title = value;
  }

  // Delete an uploaded image
  // Requires setting "Return delete token" to "Yes" in your upload preset configuration
  // See also https://support.cloudinary.com/hc/en-us/articles/202521132-How-to-delete-an-image-from-the-client-side-
  deleteImage = function (this: any, data: any, index: number) {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/delete_by_token`;
    const headers = new Headers({ 'Content-Type': 'blob', 'X-Requested-With': 'XMLHttpRequest' });
    const options = { headers: headers };
    const body = {
      token: data.delete_token
    };


    this.http.post(url, body, options).subscribe((response: { result: any; }) => {
      console.log(`Deleted image - ${data.public_id} ${response.result}`);
      // Remove deleted item for responses
      this.responses.splice(index, 1);
    });
  };

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getFileProperties(fileProperties: any) {
    // Transforms Javascript Object to an iterable to be used by *ngFor
    if (!fileProperties) {
      return null;
    }
    return Object.keys(fileProperties)
      .map((key) => ({ 'key': key, 'value': fileProperties[key] }));
  }

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

}
