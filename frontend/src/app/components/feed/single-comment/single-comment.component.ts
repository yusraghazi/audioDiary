import {Component, Input, OnInit} from '@angular/core';
import {SingleComment} from "../../../models/singleComment";
import {CommentsService} from "../../../services/comments.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.css']
})
export class SingleCommentComponent implements OnInit {
  @Input()
  postComment: SingleComment;

  constructor(private commentService: CommentsService, private auth: AuthService) { }
  getComments(): void{
    this.commentService.restFindCommentByPostId(this.postComment.post.id).subscribe(
      (data) => {
        // @ts-ignore
        console.log(data);
      },
      (error) => console.log("Error: " + error.status + " - " + error.error));

  }
  ngOnInit(): void {
    this.getComments();
  }

}
