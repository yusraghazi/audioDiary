import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../../models/post";
import {Theme} from "../../../enums/theme";
import {PostsService} from "../../../services/posts.service";
import {LikesService} from "../../../services/likes.service";
import {AuthService} from "../../../services/auth.service";
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";

@Component({
  selector: 'app-profile-post-favorite',
  templateUrl: './profile-post-favorite.component.html',
  styleUrls: ['./profile-post-favorite.component.css']
})
export class ProfilePostFavoriteComponent implements OnInit {
  @Input() selectedFavoritePost: Post | undefined;
  isShown: boolean;
  popularThemes: unknown;
  theme: String;
  themeValue: string;
  img: CloudinaryImage;
  private childParamsSubscription: Subscription;
  @Input()
  audioPost: Post

  @Output() deletedFavoriteSelected = new EventEmitter<Post>();

  favoriteposts: Post[];

  constructor(private postsService: PostsService,private route: ActivatedRoute, private likesService: LikesService, private auth: AuthService) { }

  ngOnInit(): void {
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'hogeschool-van-amsterdam'
      }
    });

    console.log("image:" + this.audioPost.img);
    this.img = cld.image(this.audioPost.img.toString());
    this.img.resize(fill().width(350).height(200)).roundCorners(byRadius(20));
    this.returnColor();
    this.childParamsSubscription =
      this.route.params.subscribe(
        (params: Params) => {
          if (params['id'] != null) {
            this.setPost(params['id']);
          }
        });
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

  async getMostPopularThemes() {
    await this.postsService.getTopFiveThemes().then(result => {
      this.popularThemes = result;
      this.themeValue = this.audioPost.theme;
      console.log(this.themeValue);
    });
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
