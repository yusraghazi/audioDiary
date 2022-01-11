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

  async toRemoveFavoritePost(){
    let currentUser = await this.auth.getUser();
    await this.likesService.getFavorites(currentUser.email).subscribe(
      (data) => {
        console.log(data);
        data.forEach(like => {
            if (like.post.id == this.audioPost.id) {
              this.likesService.restRemoveLike(like.id).subscribe(
                (data) => {
                  console.log(data);
                }, (error => console.log(error))
              );
            }
          }
        )
      }

    )
    this.deletedFavoriteSelected.emit(this.selectedFavoritePost);
  }

}
