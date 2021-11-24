import {Component, Input, OnInit} from '@angular/core';
import {SingleComment} from "../../../models/singleComment";
import {Post} from "../../../models/post";
import {PostsService} from "../../../services/posts.service";
import {CommentsService} from "../../../services/comments.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input()
  postInfo: Post;

  private childParamsSubscription: Subscription;

  comments: SingleComment[];
  description: string;


  constructor(private service: CommentsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.childParamsSubscription =
      this.route.params.subscribe(
        (params: Params) => {
          this.setComments(params['id'] || -1)
        });
    // @ts-ignore
    //this.audioPost = null;
  }

  setComments(id: number) {
    console.log(id);
    this.service.restFindCommentByPostId(id).subscribe(
      (data) => {
        this.comments = data;
        console.log(this.comments);
      }
    );
  }
//   ngOnInit(): void {
//     this.comments = [];
//     this.comments.push(new SingleComment("Yuyut", "i like this sound of renouuuuuuuuuu", "https://m.media-amazon.com/images/M/MV5BNDQwMjlmMmYtOTNkMS00OGIzLWEyNjUtZjliYTY5MzMyNmJkXkEyXkFqcGdeQXVyNTE0MDc0NTM@._V1_.jpg" ));
//     this.comments.push(new SingleComment("Renou", "i like this sound of yuyuuuuuuuuuut", "https://i.pinimg.com/originals/61/2f/da/612fdaf59ea3daa811b53682d43033a3.jpg" ));
//
//   }
  sendComment() {
    this.service.restPostComment(this.comments.length + 1);
    console.log(this.comments.length);
    // this.comments.push(new SingleComment("Taner", this.description, "https://live.staticflickr.com/4314/35471113064_9599836188_b.jpg"));
    //this.description = "";
}


}
