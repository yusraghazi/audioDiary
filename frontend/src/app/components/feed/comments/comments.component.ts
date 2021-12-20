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

    // this.comments.push(new SingleComment("Yuyut", "i like this sound of renouuuuuuuuuu", "https://m.media-amazon.com/images/M/MV5BNDQwMjlmMmYtOTNkMS00OGIzLWEyNjUtZjliYTY5MzMyNmJkXkEyXkFqcGdeQXVyNTE0MDc0NTM@._V1_.jpg" ));
    // this.comments.push(new SingleComment("Renou", "i like this sound of yuyuuuuuuuuuut", "https://i.pinimg.com/originals/61/2f/da/612fdaf59ea3daa811b53682d43033a3.jpg" ));

  }
  sendComment(){
    // this.comments.push(new SingleComment("Taner", this.description, "https://live.staticflickr.com/4314/35471113064_9599836188_b.jpg"));
    // this.description = "";

    let comment: SingleComment = new SingleComment(this.auth.getUser().username, this.description);
    this.commentService.restPostComment(comment).subscribe(
      (data) => {
        console.log(data);
      },(error) => {
        console.log(error);
      }
    );
  }


}
