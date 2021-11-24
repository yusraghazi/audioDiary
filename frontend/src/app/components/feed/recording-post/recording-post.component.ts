import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../models/post";

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


  }
  toggleShow() {

    this.isShown = ! this.isShown;

  }




}
