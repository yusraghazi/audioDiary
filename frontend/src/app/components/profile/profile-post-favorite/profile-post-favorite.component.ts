import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../../models/post";
import {Theme} from "../../../enums/theme";
import {PostsService} from "../../../services/posts.service";
import {LikesService} from "../../../services/likes.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-profile-post-favorite',
  templateUrl: './profile-post-favorite.component.html',
  styleUrls: ['./profile-post-favorite.component.css']
})
export class ProfilePostFavoriteComponent implements OnInit {
  @Input() selectedFavoritePost: Post | undefined;

  @Input() audioPost: Post

  @Output() deletedFavoriteSelected = new EventEmitter<Post>();

  favoriteposts: Post[];

  constructor(private postsService: PostsService, private likesService: LikesService, private auth: AuthService) { }

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

  activateSoundWaves(){
    const soundWaves = document.getElementById("soundwavesWrapper");

    soundWaves.classList.remove('onClickWrapper');
    soundWaves.classList.add("wrapper");
  }

  toRemoveFavoritePost(){
    this.deletedFavoriteSelected.emit(this.selectedFavoritePost);
  }

  async getFavoritePosts() {
    let currentUser = await this.auth.getUser();
    this.likesService.getFavorites(currentUser.email).subscribe(
      (data) => {
        console.log(data);
        data.forEach(like => {
            this.postsService.restGetPost(like.post.id).subscribe(
              (data) => {
                this.favoriteposts.push(data);
              }
            )
        }
        )
      }

    )
  }

}
