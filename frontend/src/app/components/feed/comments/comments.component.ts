import {Component, Input, OnInit} from '@angular/core';
import {SingleComment} from "../../../models/singleComment";
import {Post} from "../../../models/post";
import {CommentsService} from "../../../services/comments.service";
import {AuthService} from "../../../services/auth.service";


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input()
  postInfo: Post;
  comments: SingleComment[];
  description: string;

  constructor(private commentService: CommentsService, private auth: AuthService) { }
  getComments(): void{
    this.commentService.restFindCommentByPostId(this.postInfo.id).subscribe(
      (data) => {
        // @ts-ignore
        this.comments = data; console.log(data);
      },
      (error) => console.log("Error: " + error.status + " - " + error.error));

  }
  ngOnInit(): void {
    this.getComments();
  }

  sendComment(){
    this.commentService.restPostComment(new SingleComment(null, this.postInfo, this.auth.getUser(), this.description)).subscribe(
      (data) => {
        console.log(data);
      },(error) => {
        console.log(error);
      }
    );
  }


}
