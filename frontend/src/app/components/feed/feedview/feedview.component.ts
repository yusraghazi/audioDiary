import {Component, OnInit, Output} from '@angular/core';
import {Post} from "../../../models/post";
import {Theme} from "../../../enums/theme";
import {PostsService} from "../../../services/posts.service";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {share} from "rxjs/operators";

@Component({
  selector: 'app-feedview',
  templateUrl: './feedview.component.html',
  styleUrls: ['./feedview.component.css']
})
export class FeedviewComponent implements OnInit {

  @Output()
  popularPosts: unknown = null;
  posts: Post[];
  text: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  @Output()
  mapview: string = "Mapview";

  constructor(private postsService: PostsService, private router: Router, public route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getAllPosts();
    this.getMostPopularThemes();
  }

  getAllPosts(): void{
    this.postsService.restGetPosts().subscribe(
      (data) => {
        // @ts-ignore
        this.posts = data;
        //console.log(data);
      },
      (error) => console.log("Error: " + error.status + " - " + error.error)
    );
  }

  getPostByTheme(theme: string) {
    this.router.navigate(
      ['/feedview'],
      { queryParams: { hashtag: theme } }
    );
    this.postsService.getPostsByTheme(theme).subscribe(
      (data) => {
        // @ts-ignore
        this.posts = data;
        //console.log(data);
      },
      (error) => console.log("Error: " + error.status + " - " + error.error)
    );
  }

  async getMostPopularThemes() {
    await this.postsService.getTopFiveThemes().then(result => {
      this.popularPosts = result;
    });
    //this.popularPosts = this.postsService.getTopFiveThemes();
  }

//  returnColor(post: Post) {
  //   switch (post.theme) {
  //     case this.popularPosts[0]:
  //       post.theme = "red"
  //       break;
  //     case this.popularPosts[1]:
  //       post.theme = "orange"
  //       break;
  //     case this.popularPosts[2]:
  //       post.theme = "yellow"
  //       break;
  //     case this.popularPosts[3]:
  //       post.theme = "green"
  //       break;
  //     case this.popularPosts[4]:
  //       post.theme = "blue"
  //       break;
  //     case this.popularPosts[5]:
  //       post.theme = "grey"
  //       break;
  //   }
  //
  //   return post.theme;
  // }

}
