import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/post";
import {Subscription} from "rxjs";
import {PostsService} from "../../services/posts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.css']
})
export class EditingComponent implements OnInit {
private childparamsSub: Subscription;
  newPost: Post;

  editTitle: string = 'card title';
  editDescription: string = 'here comes the description';

  cardColor = '#FE5F38'

  imageSrc: string | ArrayBuffer;

  constructor(private postService: PostsService, private route: Router) { }

  ngOnInit(): void {

  }

  url: any; //Angular 11, for stricter type
  msg = "";

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }


  createNewPost(id: number) {
    this.postService.restCreateNewPost(id).subscribe(
      (data) => {
        this.newPost = data; console.log(data);
      },
      (error) => console.log("Error: " + error.status + " - " + error.error)
    );
  }

  backButton(){
    if (confirm("do you want to discard changes")) {
      this.route.navigateByUrl('rec-done')
    }
  }

  postButton(){
    this.route.navigateByUrl('feedview');
  }


  getSelectedColor(){
    return this.cardColor;
  }

}
