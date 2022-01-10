import {Component, OnInit, Output} from '@angular/core';
import {Post} from "../../../models/post";
import {Theme} from "../../../enums/theme";
import {PostsService} from "../../../services/posts.service";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Meta} from "@angular/platform-browser";
import {ShareService} from "../../../services/share.service";

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

  constructor(private postsService: PostsService, private router: Router, private route: ActivatedRoute, private meta:Meta, private shareService: ShareService) {

  }

  ngOnInit(): void {
    const urlId = this.router.url.split("/")[2]

    if(isNaN(+urlId)){
      this.getPostById()
    } else {
      this.getAllPosts();

    }



    this.getMostPopularThemes();

    this.route.queryParams.subscribe(
      params => {
        console.log(params);
        if (params.hashtag != null) {
          this.getPostByTheme(params.hashtag)
        }
      }
    );
    // this.posts.push(new Post(1,"haji", "River Sounds", this.text,"river.jpg",Theme.SUN, true))
    // this.posts.push(new Post(2,"amshoum", "Brown Mountains", this.text,"mountain.jpg",Theme.MOUNTAIN, false))
    // this.posts.push(new Post(3,"boras", "Amazon Birds", this.text,"amazon.jpg",Theme.FOREST, true))
    // this.posts.push(new Post(4, "farid","Sound of Waves", this.text,"seawaves.jpg",Theme.WATER, false))
    // this.posts.push(new Post(5, "aziz","Sand storm", this.text,"sandstorm.jpg",Theme.SAND, true))
    // this.posts.push(new Post(6, "joost","Amsterdam bikes", this.text,"amsterdamBikes.jpg",Theme.CITY, false))
    //


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
      console.log(this.popularPosts);
    });
    //this.popularPosts = this.postsService.getTopFiveThemes();
  }

 async getPostById() {
   const id = this.router.url.split("/")[2];

   console.log(+id)
   console.log(id)

   console.log(this.postsService.restGetPost(+id).subscribe(
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
       (error) => console.log("Error: " + error.status + " - " + error.error)
     )
   );

  }
}

