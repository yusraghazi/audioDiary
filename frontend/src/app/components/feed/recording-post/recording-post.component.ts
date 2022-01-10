import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../models/post";
import {Theme} from "../../../enums/theme";
import {PostsService} from "../../../services/posts.service";
import {LikesService} from "../../../services/likes.service";
import {AuthService} from "../../../services/auth.service";
import {Like} from "../../../models/like";


@Component({
  selector: 'app-recording-post',
  templateUrl: './recording-post.component.html',
  styleUrls: ['./recording-post.component.css']
})
export class RecordingPostComponent implements OnInit {
  @Input()
  audioPost: Post
  isShown: boolean;
  popularThemes: unknown;
  theme: String;

  constructor(private postsService: PostsService, private likesService: LikesService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.returnColor();



  }

  async getMostPopularThemes() {
    await this.postsService.getTopFiveThemes().then(result => {
      this.popularThemes = result;
      console.log(this.popularThemes);
    });
  }

  async returnColor() {
    await this.getMostPopularThemes();
    switch (this.audioPost.theme) {
      // @ts-ignore
      case this.popularThemes[0][0]:
        this.audioPost.theme = Theme.SUN;
        break;
      // @ts-ignore
      case this.popularThemes[1][0]:
        this.audioPost.theme = Theme.WATER;
        break;
      // @ts-ignore
      case this.popularThemes[2][0]:
        this.audioPost.theme = Theme.CITY;
        break;
      // @ts-ignore
      case this.popularThemes[3][0]:
        this.audioPost.theme = Theme.SAND;
        break;
      // @ts-ignore
      case this.popularThemes[4][0]:
        this.audioPost.theme = Theme.MOUNTAIN;
        break;
      default:
        this.audioPost.theme = Theme.FOREST;
        break;
    }

    console.log(this.theme);
    return this.theme;
  }

  toggleShow() {

    this.isShown = ! this.isShown;

  }

  addToLikes() {
    let currentUser = this.authService.getUser();
    let like = new Like(null, this.audioPost.id, currentUser.email);
    this.likesService.restPostLike(like);
  }



}
