import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../../services/posts.service";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  amountOfUsers: number;
  amountOfPosts: number;

  constructor(private userService: UserService, private postService: PostsService) { }

  ngOnInit(): void {
    this.getAmountOfPosts();
    this.getAmountOfUsers();
  }

  getAmountOfUsers() {
    this.userService.getAmountOfUsers().subscribe(
      (data) => {
        // @ts-ignore
        this.amountOfUsers = data; console.log(data);
      },
      (error) => console.log("Error: " + error.status + " - " + error.error)
    );
    return this.amountOfUsers;
  }

  getAmountOfPosts() {
    this.postService.restGetPosts().subscribe(
      (data) => {
        // @ts-ignore
        this.amountOfPosts = data.length; console.log(data);
      },
      (error) => console.log("Error: " + error.status + " - " + error.error)
    );
    return this.amountOfPosts;
  }

}
