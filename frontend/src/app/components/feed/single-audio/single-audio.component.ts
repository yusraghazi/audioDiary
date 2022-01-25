import {Component, Input, OnInit} from '@angular/core';
import {PostsService} from "../../../services/posts.service";
import {ActivatedRoute, NavigationEnd, Params, Router, RouterOutlet} from "@angular/router";
import {Subscription} from "rxjs";
import {Post} from "../../../models/post";
import {Theme} from "../../../enums/theme";
import {LikesService} from "../../../services/likes.service";
import {AuthService} from "../../../services/auth.service";
import {Like} from "../../../models/like";
import {User} from "../../../models/user";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {Formattedpost} from "../../../models/formattedpost";

@Component({
  selector: 'app-single-audio',
  templateUrl: './single-audio.component.html',
  styleUrls: ['./single-audio.component.css']
})
export class SingleAudioComponent implements OnInit {

  @Input()
  audioPost: Post = new Post();
  isShown: boolean;
  popularThemes: unknown;
  theme: String;
  themeValue: string;
  username: string = "";
  img: CloudinaryImage = new CloudinaryImage();
  private childParamsSubscription: Subscription;
  playBtn: boolean;
  audioUrl: string;
  color: string = "transparent";
  like: Like = null;

  constructor(private postsService: PostsService, private likesService: LikesService, private authService: AuthService
    , private route: ActivatedRoute, private router: Router) {
    this.childParamsSubscription =
      this.route.params.subscribe(
        (params: Params) => {
          this.setPost(params['id']).then(r => this.ngOnInit());
        });
  }

  ngOnInit(): void {
    this.returnColor();
  }

  async setPost(id: number) {
    await this.postsService.restGetPost(id).subscribe(
      (data) => {

        this.audioPost = data;
        this.username = data.user.username;
        this.img = cld.image(data.img.toString());
        this.img.resize(fill().width(350).height(200)).roundCorners(byRadius(20));
      }
    );
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'hogeschool-van-amsterdam'
      }
    });
  }

  async getMostPopularThemes() {
    await this.postsService.getTopFiveThemes().then(result => {
      this.popularThemes = result;
      this.themeValue = this.audioPost.theme;
    });
  }

  async returnColor() {
    await this.getMostPopularThemes();
    switch (this.audioPost.theme) {
      // @ts-ignore
      case this.popularThemes[0][0]:
        this.color = Theme.SUN;
        break;
      // @ts-ignore
      case this.popularThemes[1][0]:
        this.color = Theme.SAND;
        break;
      // @ts-ignore
      case this.popularThemes[2][0]:
        this.color = Theme.FOREST;
        break;
      // @ts-ignore
      case this.popularThemes[3][0]:
        this.color = Theme.WATER;
        break;
      // @ts-ignore
      case this.popularThemes[4][0]:
        this.color = Theme.MOUNTAIN;
        break;
      default:
        this.color = Theme.CITY;
        break;
    }
    return this.theme;
  }

  toggleShow() {

    this.isShown = ! this.isShown;

  }

  playButton() {
    var audio = document.getElementById(this.audioPost.id.toString()) as HTMLAudioElement;
    if (!this.playBtn) {
      this.playBtn = true;
      audio.play()

    } else if (this.playBtn) {
      this.playBtn = false;
      audio.pause()
    }

    if (audio.ended) {
      this.playBtn = false;
    }

  }

  async addToLikes() {
    let currentUser = Object.assign(new User(), this.authService.getUser());
    let post = await Object.assign(new Formattedpost(), this.audioPost);
    this.like = await new Like(null, post, currentUser);

    if (this.like != null) {
      this.likesService.restPostLike(this.like).subscribe(
        (data) => {
          console.log(data);
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

  changeRoute() {
    this.router.navigateByUrl('/dummy', {skipLocationChange: true});
    setTimeout(() => this.router.navigateByUrl("/mapview"));
  }

  async sharePost() {
    if (navigator.share) {

    }
    const shareData = {
      title: this.audioPost.title,
      text: this.audioPost.description,
      url: 'https://audiodiary-fe-team1-staging.herokuapp.com/feedview/'+this.audioPost.id
    }

    await navigator.share(shareData)

  }
}
