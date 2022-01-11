import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../models/post";
import {Theme} from "../../../enums/theme";
import {PostsService} from "../../../services/posts.service";
import {LikesService} from "../../../services/likes.service";
import {AuthService} from "../../../services/auth.service";
import {Like} from "../../../models/like";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {User} from "../../../models/user";
import {audit} from "rxjs/operators";


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
  themeValue: string;
  private childParamsSubscription: Subscription;

  constructor(private postsService: PostsService, private likesService: LikesService, private authService: AuthService
  , private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.returnColor();
    this.childParamsSubscription =
      this.route.params.subscribe(
        (params: Params) => {
          if (params['id'] != null) {
            this.setPost(params['id']);
          }
        });
//     console.log(this.audioPost);
//
// switch (this.audioPost.theme) {
//   case "Theme.SUN":
//     this.audioPost.theme = Theme.SUN;
//     break;
//   case "Theme.SAND":
//     this.audioPost.theme = Theme.SAND;
//     break;
//   case "Theme.FOREST":
//     this.audioPost.theme = Theme.FOREST;
//     break;
//   case "Theme.WATER":
//     this.audioPost.theme = Theme.WATER;
//     break;
//   case "Theme.CITY":
//     this.audioPost.theme = Theme.CITY;
//     break;
//   case "Theme.MOUNTAIN":
//     this.audioPost.theme = Theme.MOUNTAIN;
//     break;
//}


  }

  async setPost(id: number) {
    await this.postsService.restGetPost(id).subscribe(
      (data) => {
        // @ts-ignore
        this.audioPost = Object.assign(new Post(), data);
        console.log(this.audioPost);
      }
    );
  }

  async getMostPopularThemes() {
    await this.postsService.getTopFiveThemes().then(result => {
      this.popularThemes = result;
      this.themeValue = this.audioPost.theme;
      console.log(this.themeValue);
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
        this.audioPost.theme = Theme.SAND;
        break;
      // @ts-ignore
      case this.popularThemes[2][0]:
        this.audioPost.theme = Theme.FOREST;
        break;
      // @ts-ignore
      case this.popularThemes[3][0]:
        this.audioPost.theme = Theme.WATER;
        break;
      // @ts-ignore
      case this.popularThemes[4][0]:
        this.audioPost.theme = Theme.MOUNTAIN;
        break;
      default:
        this.audioPost.theme = Theme.CITY;
        break;
    }
    return this.theme;
  }

  toggleShow() {

    this.isShown = !this.isShown;

  }

  like: Like = null;
  updatedLike: Like = null;

  async addToLikes() {
    let currentUser = Object.assign(new User(), this.authService.getUser());
    let post = await Object.assign(new Post(), this.audioPost);
    this.like = await new Like(null, post, currentUser);
    console.log(JSON.parse(JSON.stringify(this.like)));
    if (this.like != null) {
      this.likesService.restPostLike(this.like).subscribe(
        (data) => {
          console.log(data);
          this.updatedLike = data;
        },
        (error =>
          console.log(error))
      );
    }
  }

  removeFromLikes() {
      this.likesService.restRemoveLike(this.updatedLike.id).subscribe(
        (data) => {
          console.log(data)
        },
        (error =>
          console.log(error))
      );
  }


 async sharePost() {
    if (navigator.share) {
      console.log("ja")

    }
    const shareData = {
      title: this.audioPost.title,
      text: this.audioPost.description,
      url: 'https://audiodiary-fe-team1-staging.herokuapp.com/feedview/'+this.audioPost.id
    }

      await navigator.share(shareData)

  }
}

