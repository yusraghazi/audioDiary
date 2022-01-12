import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../../services/posts.service";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  amountOfUsers: number = 0;
  amountOfPosts: number = 0;
  popularTheme: unknown = null;
  currentAdmin: User = new User();
  popularThemeText: string = "";
  popularAmountText: string = "";

  constructor(private userService: UserService, private postsService: PostsService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loadThemes();
    this.checkAdminOrResearch();
    this.getAmountOfPosts();
    this.getAmountOfUsers();
  }

  async loadThemes() {
    await this.postsService.getTopFiveThemes().then(result => {
      // @ts-ignore
      this.popularTheme = result;
    });

    // @ts-ignore
    this.popularThemeText = this.popularTheme[0][0];

    // @ts-ignore
    this.popularAmountText = this.popularTheme[0][1];
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
    this.postsService.restGetPosts().subscribe(
      (data) => {
        // @ts-ignore
        this.amountOfPosts = data.length; console.log(data);
      },
      (error) => console.log("Error: " + error.status + " - " + error.error)
    );
    return this.amountOfPosts;
  }

  checkAdminOrResearch() {
    let user = this.userService.restGetUser(this.authService.getUser().email)
    user.pipe().subscribe(
      (data) => {
        this.currentAdmin = data;
        console.log(this.currentAdmin.verified);
      }
    )
  }

}
