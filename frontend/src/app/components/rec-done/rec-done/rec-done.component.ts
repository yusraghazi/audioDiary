import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import WaveformPlaylist from 'waveform-playlist';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Cloudinary, CloudinaryImage, CloudinaryVideo} from "@cloudinary/url-gen";
import * as RecordRTC from "recordrtc";
import {fill, scale} from "@cloudinary/url-gen/actions/resize";
import {FileUploaderOptions} from "ng2-file-upload";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-rec-done',
  templateUrl: './rec-done.component.html',
  styleUrls: ['./rec-done.component.css']
})
export class RecDoneComponent implements OnInit {
  closeResult = '';
  cardColor = '#FE5F38'
  clicked = false;
  img: CloudinaryImage;
  vid: CloudinaryVideo;
  isShow = false;
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

  imageSrc: string | ArrayBuffer;

  @Input()
  responses: Array<any>;



  constructor(private modalService: NgbModal, private router: Router, private domSanitizer: DomSanitizer) {

  }


  sanitize(url:string){
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  initiateRecording() {
    this.isShow = true;
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
    this.isShow = !this.isShow;
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




  eventListenAudio(){
    const url = "https://api.cloudinary.com/v1_1/hogeschool-van-amsterdam/upload";
    const form = document.querySelector("form");
    // @ts-ignore
    const files = document.querySelector("[type=file]").files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");
      // formData.append("public_id", "6");

      fetch(url, {
        method: "POST",
        body: formData
      })
          .then((response) => {
            return response.text();
          })
          .then((data) => {
            document.getElementById("data").innerHTML += "Your audio is uploaded succesfully!";
          });
    }

  };





  ngOnInit(): void {

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

  }

  openAudio(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {
    });
  }

//
// playSound(){
//   let audio = new Audio();
//   audio.src = "../assets/audio/creative_minds.mp3";
//   audio.load();
//   audio.play();
//
// }
//
// stopSound(){
//   let audio = new Audio();
//
//   audio.pause();
//   audio.currentTime = 0;
//
// }
//
// activateSoundWaves(){
//   const soundWaves = document.getElementById("soundwavesWrapper");
//
//    soundWaves.classList.remove('onClickWrapper');
//    soundWaves.classList.add("wrapper");
//  }

  // stopRecording() {
  //   this.audioRecorderService.stopRecording(OutputFormat.WEBM_BLOB).then((output) => {
  //     // do post output steps
  //   }).catch(errrorCase => {
  //     // Handle Error
  //   });
  // }

  getSelectedColor(){
    return this.cardColor;
  }

  buttonEditing(){
    this.router.navigateByUrl('editing');
  }

}
