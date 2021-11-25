import {NgAudioRecorderService, OutputFormat} from 'ng-audio-recorder';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})



export class FooterComponent implements OnInit {
  showRecordBtn: boolean = true;
  value = './assets/img/rec-button.png'; //default_value
  constructor(private audioRecorderService: NgAudioRecorderService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.audioRecorderService.recorderError.subscribe(recorderErrorCase => {
      // Handle Error
    })

  }
  
  startRecording() {
    this.audioRecorderService.startRecording();
    console.log("recording")
  }

  stopRecording() {
    this.audioRecorderService.stopRecording(OutputFormat.WEBM_BLOB).then((output) => {
      // do post output steps
      console.log("it works");
    }).catch(errrorCase => {
      console.log("error")
      // Handle Error
    });
  }

  // updateImage() {
  //   this.value = 'https://www.pngall.com/wp-content/uploads/5/Pause-Button-Transparent.png';
  // }





  ngOnInit(): void {

  }

}
