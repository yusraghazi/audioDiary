import {Component, Input, OnInit, Output} from '@angular/core';
import {PostsService} from "../../../services/posts.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {Post} from "../../../models/post";
import {CommentsService} from "../../../services/comments.service";

@Component({
  selector: 'app-single-audio',
  templateUrl: './single-audio.component.html',
  styleUrls: ['./single-audio.component.css']
})
export class SingleAudioComponent implements OnInit {
  private childParamsSubscription: Subscription;

  @Input()
  audioPost: Post;

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

  // TODO: fix display of post
  setPost(id: number) {
    this.service.restGetPost(id).subscribe(
      (data) => {
        // @ts-ignore
        this.audioPost = Object.assign(new Post(), data);
        console.log(this.audioPost);
      }
    );
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
