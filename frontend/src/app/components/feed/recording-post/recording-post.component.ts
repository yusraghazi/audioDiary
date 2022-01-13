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
import {Cloudinary, CloudinaryImage, CloudinaryVideo} from "@cloudinary/url-gen";
import {fill, scale} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {Formattedpost} from "../../../models/formattedpost";
import Transformation from "@cloudinary/url-gen/backwards/transformation";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";


@Component({
  selector: 'app-recording-post',
  templateUrl: './recording-post.component.html',
  styleUrls: ['./recording-post.component.css']
})
export class RecordingPostComponent implements OnInit {
  @Input()
  audioPost: Post = new Post();
  isShown: boolean;
  popularThemes: unknown;
  theme: String;
  themeValue: string;
  img: CloudinaryImage;
  vid: CloudinaryVideo;
  private childParamsSubscription: Subscription;
  favoritePosts: Post[] = [];
  isShow: boolean;

  constructor(private postsService: PostsService, private likesService: LikesService, private authService: AuthService
  , private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    console.log(this.audioPost.id);

    const cld = new Cloudinary({
      cloud: {
        cloudName: 'hogeschool-van-amsterdam'
      }
    });

    this.img = cld.image(this.audioPost.img.toString());
    console.log("img: " + this.audioPost.img.toString());
    this.vid = cld.video(this.audioPost.audiofile.toString());
    console.log("vid: " + this.audioPost.audiofile.toString());
    cld.video(this.audioPost.audiofile.toString()).resize(scale().width(400));
    cld.video(this.audioPost.audiofile.toString()).toURL();
    console.log( cld.video(this.audioPost.audiofile.toString()).toURL());
    this.img.resize(fill().width(350).height(200)).roundCorners(byRadius(20));

    this.returnColor();
  }

  async getMostPopularThemes() {
    await this.postsService.getTopFiveThemes().then(result => {
      this.popularThemes = result;
      this.themeValue = this.audioPost.theme;
      console.log(this.themeValue);
    });
  }

  setShow() {
    setTimeout(() => {
      this.isShow = false;
    }, 3000);
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
    let post = await Object.assign(new Formattedpost(), this.audioPost);
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
    this.likesService.getFavorites(this.authService.getUser().email).subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].post.id == this.audioPost.id) {
            this.likesService.restRemoveLike(data[i].id).subscribe(
              (data) => {
                console.log(data)
              },
              (error =>
                console.log(error))
            );
          }
        }
      }
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

