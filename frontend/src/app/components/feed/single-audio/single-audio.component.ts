import {AfterViewInit, Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PostsService} from "../../../services/posts.service";
import {ActivatedRoute, NavigationEnd, Params, Router, RouterOutlet} from "@angular/router";
import {Subscription} from "rxjs";
import {Post} from "../../../models/post";
import {Theme} from "../../../enums/theme";
import {OverlayModule} from '@angular/cdk/overlay';
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
  // private childParamsSubscription: Subscription;

  // @Input()
  // audioPost: Post;
  //
  // @ViewChild(RouterOutlet) outlet: RouterOutlet;
  //
  // backgroundColor: string;
  //
  // //commentsList: Comment[];
  //
  // isShown: boolean;
  //
  // constructor(private service: PostsService, private route: ActivatedRoute) {
  // }
  //
  // ngOnInit() {
  //   this.childParamsSubscription =
  //     this.route.params.subscribe(
  //       (params: Params) => {
  //         this.setPost(params['id'] || -1);
  //       });
  //   // @ts-ignore
  //   //this.audioPost = null;
  // }
  //
  // ngAfterViewInit() {
  //   this.setColor();
  // }
  //
  // // TODO: fix display of post
  // async setPost(id: number) {
  //   await this.service.restGetPost(id).subscribe(
  //     (data) => {
  //       // @ts-ignore
  //       this.audioPost = Object.assign(new Post(), data);
  //       console.log(this.audioPost);
  //     }
  //   );
  // }
  //
  // setColor() {
  //   //const overlay = document.getElementById("overlay");
  //   if (this.audioPost.theme == "Theme.SUN") {
  //     this.backgroundColor = "#fa4114";
  //     //overlay.style.background = "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)";
  //   } else if (this.audioPost.theme == "Theme.SAND") {
  //     this.backgroundColor = "#FFB366"
  //   } else if (this.audioPost.theme == "Theme.WATER") {
  //     //overlay.style.backgroundImage = 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)';
  //     this.backgroundColor = "#90D2E0";
  //   } else if (this.audioPost.theme == "Theme.CITY") {
  //     this.backgroundColor = "#A28EB2"
  //   } else {
  //     this.backgroundColor = "#9F7D5A"
  //   }
  //   // return this.backgroundColor;
  // }
  //
  // // setComments(id: number) {
  // //   console.log(id);
  // //   this.comments.restFindCommentByPostId(id).subscribe(
  // //     (data) => {
  // //       for (let i = 0; i < data.length; i++) {
  // //         this.commentsList.push(data[i]);
  // //       }
  // //     }
  // //   );
  // // }
  //
  // // getComments() {
  // //   return this.commentsList;
  // // }
  //
  // toggleShow() {
  //     this.isShown = ! this.isShown;
  //   }
  //
  //   activateSoundWaves(){
  //     const soundWaves = document.getElementById("soundwavesWrapper");
  //
  //     soundWaves.classList.remove('onClickWrapper');
  //     soundWaves.classList.add("wrapper");
  //   }


  @Input()
  audioPost: Post;
  isShown: boolean;
  popularThemes: unknown;
  theme: String;
  themeValue: string;
  img: CloudinaryImage;
  private childParamsSubscription: Subscription;

  constructor(private postsService: PostsService, private likesService: LikesService, private authService: AuthService
    , private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.returnColor();
    this.childParamsSubscription =
      this.route.params.subscribe(
        (params: Params) => {
          console.log(params['id']);
            this.setPost(params['id']);
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
        console.log("data:" + data);
        this.audioPost = data;
        this.img = cld.image(data.img.toString());
        this.img.resize(fill().width(350).height(200)).roundCorners(byRadius(20));
      }
    );
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'hogeschool-van-amsterdam'
      }
    });
    // this.img = cld.image(this.audioPost.img.toString());
    // this.img.resize(fill().width(350).height(200)).roundCorners(byRadius(20));
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

    this.isShown = ! this.isShown;

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
    this.router.navigateByUrl('/dummy', { skipLocationChange: true });
    setTimeout(() => this.router.navigate(["/mapview"]));
  }
}
