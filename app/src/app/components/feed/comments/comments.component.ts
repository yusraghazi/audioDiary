import { Component, OnInit } from '@angular/core';
import {SingleComment} from "../../../models/singleComment";


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: SingleComment[];
  description: string;

  constructor() { }

  ngOnInit(): void {
    this.comments = [];
    this.comments.push(new SingleComment("Yuyut", "i like this sound of renouuuuuuuuuu", "https://m.media-amazon.com/images/M/MV5BNDQwMjlmMmYtOTNkMS00OGIzLWEyNjUtZjliYTY5MzMyNmJkXkEyXkFqcGdeQXVyNTE0MDc0NTM@._V1_.jpg" ));
    this.comments.push(new SingleComment("Renou", "i like this sound of yuyuuuuuuuuuut", "https://i.pinimg.com/originals/61/2f/da/612fdaf59ea3daa811b53682d43033a3.jpg" ));

  }
  sendComment(){
    this.comments.push(new SingleComment("Taner", this.description, "https://live.staticflickr.com/4314/35471113064_9599836188_b.jpg"));
    this.description = "";

}

}
