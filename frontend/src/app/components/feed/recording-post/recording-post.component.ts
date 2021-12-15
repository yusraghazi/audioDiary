import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../models/post";
import {Theme} from "../../../enums/theme";


@Component({
  selector: 'app-recording-post',
  templateUrl: './recording-post.component.html',
  styleUrls: ['./recording-post.component.css']
})
export class RecordingPostComponent implements OnInit {
  @Input()
  audioPost: Post
  isShown: boolean;



  constructor() {

  }

  ngOnInit(): void {

switch (this.audioPost.theme) {
  case "Theme.SUN":
    this.audioPost.theme = Theme.SUN;
    break;
  case "Theme.SAND":
    this.audioPost.theme = Theme.SAND;
    break;
  case "Theme.FOREST":
    this.audioPost.theme = Theme.FOREST;
    break;
  case "Theme.WATER":
    this.audioPost.theme = Theme.WATER;
    break;
  case "Theme.CITY":
    this.audioPost.theme = Theme.CITY;
    break;
  case "Theme.MOUNTAIN":
    this.audioPost.theme = Theme.MOUNTAIN;
    break;

}


  }
  toggleShow() {

    this.isShown = ! this.isShown;

  }




}
