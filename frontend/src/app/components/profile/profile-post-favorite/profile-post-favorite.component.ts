import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../../models/post";

@Component({
  selector: 'app-profile-post-favorite',
  templateUrl: './profile-post-favorite.component.html',
  styleUrls: ['./profile-post-favorite.component.css']
})
export class ProfilePostFavoriteComponent implements OnInit {
  @Input() selectedFavoritePost: Post | undefined;

  @Input() audioPost: Post
  // isShown: boolean;

  @Output() deletedFavoriteSelected = new EventEmitter<Post>();

  constructor() { }

  ngOnInit(): void {
  }

  activateSoundWaves(){
    const soundWaves = document.getElementById("soundwavesWrapper");

    soundWaves.classList.remove('onClickWrapper');
    soundWaves.classList.add("wrapper");
  }

  toRemoveFavoritePost(){
    this.deletedFavoriteSelected.emit(this.selectedFavoritePost);
  }


}
