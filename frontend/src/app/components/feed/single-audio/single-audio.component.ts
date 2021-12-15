import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {PostsService} from "../../../services/posts.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {Post} from "../../../models/post";
import {Theme} from "../../../enums/theme";

@Component({
  selector: 'app-single-audio',
  templateUrl: './single-audio.component.html',
  styleUrls: ['./single-audio.component.css']
})
export class SingleAudioComponent implements OnInit, AfterViewInit {
  private childParamsSubscription: Subscription;

  @Input()
  audioPost: Post;

  backgroundColor: string;

  //commentsList: Comment[];

  isShown: boolean;

  constructor(private service: PostsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.childParamsSubscription =
      this.route.params.subscribe(
        (params: Params) => {
          this.setPost(params['id'] || -1);
        });
    // @ts-ignore
    //this.audioPost = null;
  }

  ngAfterViewInit() {
    this.setColor();
  }

  // TODO: fix display of post
  async setPost(id: number) {
    await this.service.restGetPost(id).subscribe(
      (data) => {
        // @ts-ignore
        this.audioPost = Object.assign(new Post(), data);
        console.log(this.audioPost);
      }
    );
  }

  setColor() {
    const overlay = document.getElementById("overlay");
    if (this.audioPost.theme == "Theme.SUN") {
      this.backgroundColor = "#fa4114";
      overlay.style.background = "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)";
    } else if (this.audioPost.theme == "Theme.SAND") {
      this.backgroundColor = "#FFB366"
    } else if (this.audioPost.theme == "Theme.WATER") {
      overlay.style.backgroundImage = 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)';
      this.backgroundColor = "#90D2E0";
    } else if (this.audioPost.theme == "Theme.CITY") {
      this.backgroundColor = "#A28EB2"
    } else {
      this.backgroundColor = "#9F7D5A"
    }
    console.log(this.backgroundColor);
    // return this.backgroundColor;
  }

  // setComments(id: number) {
  //   console.log(id);
  //   this.comments.restFindCommentByPostId(id).subscribe(
  //     (data) => {
  //       for (let i = 0; i < data.length; i++) {
  //         this.commentsList.push(data[i]);
  //       }
  //     }
  //   );
  // }

  // getComments() {
  //   return this.commentsList;
  // }

  toggleShow() {
      this.isShown = ! this.isShown;
    }

    activateSoundWaves(){
      const soundWaves = document.getElementById("soundwavesWrapper");

      soundWaves.classList.remove('onClickWrapper');
      soundWaves.classList.add("wrapper");
    }


}
