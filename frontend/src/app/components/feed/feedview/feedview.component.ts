import {Component, OnInit, Output, Pipe} from '@angular/core';
import {Post} from "../../../models/post";
import {Theme} from "../../../enums/theme";
import {PostsService} from "../../../services/posts.service";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Meta} from "@angular/platform-browser";
import {ShareService} from "../../../services/share.service";
import {share} from "rxjs/operators";
import {LikesService} from "../../../services/likes.service";
import {AuthService} from "../../../services/auth.service";




@Component({
  selector: 'app-feedview',
  templateUrl: './feedview.component.html',
  styleUrls: ['./feedview.component.css']

})
export class FeedviewComponent implements OnInit {

  @Output()
  popularPosts: String[] = null;
  posts: Post[];
  text: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  term: string;

  @Output()
  mapview: string = "Mapview";
  searchToken: string;

  constructor(private postsService: PostsService, private router: Router, private route: ActivatedRoute, private meta:Meta, private shareService: ShareService,
              private likesService: LikesService, private authService: AuthService) {

  }

  ngOnInit(): void {



    const id = this.router.url.split("/")[2];

    if (id == undefined){
      this.getAllPosts();

    }
    this.getFavPosts();

    this.getPostById();

    this.getMostPopularThemes();

    this.route.queryParams.subscribe(
      params => {
        if (params.hashtag != null) {
          this.getPostByTheme(params.hashtag)
        }
      }
    );

  }


  async getAllPosts(){
  await  this.postsService.restGetPosts().subscribe(
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

 async getPostById() {
   const id = this.router.url.split("/")[2];




 this.postsService.restGetPost(+id).subscribe(
       (data) =>{
         this.posts = [ ];
         this.posts[0] = data;
         this.shareService.setSocialMediaTags(
          "https://audiodiary-fe-team1-staging.herokuapp.com"+ this.router.url,
           data.title,
           data.description,
           data.img);
         console.log(data);
       },
       (error) =>this.getAllPosts(),
     )




  }

  async getFavPosts() {
    let currentUser = await this.authService.getUser();
    if (currentUser == undefined) return;
      await this.likesService.getFavorites(currentUser.email).subscribe(
        (data) => {
          console.log("data: " + data);
          data.forEach(like => {
              console.log("like: " + like);
              this.postsService.restGetPost(like.post.id).subscribe(
                (post) => {
                  this.posts[this.posts.indexOf(post)].isLiked = true;
                }
              )
            }
          )
        }
      )
    }

}

