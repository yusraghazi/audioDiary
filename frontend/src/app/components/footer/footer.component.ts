import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {DomSanitizer} from "@angular/platform-browser";
import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})



export class FooterComponent implements OnInit {
  showRecordBtn: boolean = true;
  login: boolean = true;
  value = './assets/img/rec-button.png'; //default_value
  // constructor(private audioRecorderService: NgAudioRecorderService, private router: Router, private activatedRoute: ActivatedRoute) {
  //   this.audioRecorderService.recorderError.subscribe(recorderErrorCase => {
  //     // Handle Error
  //   })

  //Lets initiate Record OBJ
  public record:any;
  //Will use this flag for detect recording
  public recording = false;
  //Url of Blob
  public url:any;
  public error:any;



    constructor(public router: Router, private activatedRoute: ActivatedRoute, private domSanitizer: DomSanitizer,
      public auth: AuthService) {
      if (auth.isLoggedIn() == null) {
        this.login = false;
      }


    }

  sanitize(url:string){
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  /**
   * Start recording.
   */
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

  logOut() {
    this.auth.logout();
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
  }
  /**
   * Process Error.
   */
  errorCallback(error:any) {
    this.error = 'Can not play audio in your browser';
  }


  // startRecording() {
  //   this.audioRecorderService.startRecording();
  //   console.log("recording")
  // }
  //
  // stopRecording() {
  //   this.audioRecorderService.stopRecording(OutputFormat.WEBM_BLOB).then((output) => {
  //     // do post output steps
  //     console.log("it works");
  //   }).catch(errrorCase => {
  //     console.log("error")
  //     // Handle Error
  //   });
  // }

  // updateImage() {
  //   this.value = 'https://www.pngall.com/wp-content/uploads/5/Pause-Button-Transparent.png';
  // }





  ngOnInit(): void {

  }

}
