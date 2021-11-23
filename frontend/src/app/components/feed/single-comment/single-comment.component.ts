import {Component, Input, OnInit} from '@angular/core';
import {SingleComment} from "../../../models/singleComment";

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.css']
})
export class SingleCommentComponent implements OnInit {
  @Input()
  postComment: SingleComment;

  constructor() { }

  ngOnInit(): void {
  }

}
