import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../models/post";

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.css']
})
export class ProfilePostComponent implements OnInit {
  @Input()
  audioPost: Post
  isShown: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  activateSoundWaves(){
    const soundWaves = document.getElementById("soundwavesWrapper");

    soundWaves.classList.remove('onClickWrapper');
    soundWaves.classList.add("wrapper");
  }

}
