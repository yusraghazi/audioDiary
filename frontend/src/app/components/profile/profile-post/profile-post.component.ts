import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../../models/post";
import {Theme} from "../../../enums/theme";
import {PostsService} from "../../../services/posts.service";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {Subscription} from "rxjs";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.css']
})
export class ProfilePostComponent implements OnInit {
  @Input() selectedPost: Post | undefined;
  isShown: boolean;
  popularThemes: unknown;
  theme: String;
  themeValue: string;
  img: CloudinaryImage;
  private childParamsSubscription: Subscription;
  @Input()
  audioPost: Post


  @Output() deleteSelected = new EventEmitter<Post>();

  constructor(private postsService: PostsService,private route: ActivatedRoute, private authService: AuthService) { }

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

  toRemovePost(){
    this.deleteSelected.emit(this.selectedPost);
    const postId = this.selectedPost.id;
    console.log(postId);
    this.postsService.restDeletePosts(postId).subscribe(
      (response) =>{
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

}
