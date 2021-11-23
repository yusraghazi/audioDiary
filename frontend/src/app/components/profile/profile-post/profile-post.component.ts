import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../../models/post";

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.css']
})
export class ProfilePostComponent implements OnInit {
  @Input() selectedPost: Post | undefined;
  @Input() selectedFavoritePost: Post | undefined;

  @Input() audioPost: Post
  // isShown: boolean;

  @Output() deletedSelected = new EventEmitter<Post>();
  @Output() deletedFavoriteSelected = new EventEmitter<Post>();

  constructor() { }

  ngOnInit(): void {
  }

  activateSoundWaves(){
    const soundWaves = document.getElementById("soundwavesWrapper");

    soundWaves.classList.remove('onClickWrapper');
    soundWaves.classList.add("wrapper");
  }

  toRemovePost(){
    this.deletedSelected.emit(this.selectedPost);
  }

  toRemoveFavoritePost(){
    this.deletedFavoriteSelected.emit(this.selectedFavoritePost);
  }


}
