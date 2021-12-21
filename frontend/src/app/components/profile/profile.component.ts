import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/post";
import {Theme} from "../../enums/theme";
import {PostsService} from "../../services/posts.service";
declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  posts!: Post[];
  favoritePost!: Post[];

  @Input()
  audioPost: Post;

  selectedPost: Post | undefined;
  selectedFavoritePost: Post | undefined;

  text: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  constructor(private postsService: PostsService) {}

  getAllPosts(): void{
    this.postsService.restGetPosts().subscribe(
      (data) => {
        // @ts-ignore
        this.posts = data; console.log(data);
      },
      (error) => console.log("Error: " + error.status + " - " + error.error)
    );
  }



  getFavPosts(): void{
    this.postsService.restGetPosts().subscribe(
      (data) => {
        // @ts-ignore
        this.favoritePost = data; console.log(data);
      },
      (error) => console.log("Error: " + error.status + " - " + error.error)
    );
  }

  // deletePosts(postId: number): void{
  //   this.postsService.restDeletePosts(postId).subscribe(
  //     (response) =>{
  //       console.log(response);
  //     },
  //     (error)=>{
  //       console.log(error);
  //     }
  //   );
  // }

  ngOnInit(): void {
    this.getAllPosts();
    this.getFavPosts();
  }

  postSelection(postSelection:Post){
    this.selectedPost = postSelection;
  }

  favoritePostSelection(favoritePostSelection:Post){
    this.selectedFavoritePost = favoritePostSelection;
  }

  get getSelectedPost(){
    return this.selectedPost;
  }

  get getSelectedFavoritePost(){
    return this.selectedFavoritePost;
  }

  // onDelete(post: Post ){
  //   let index = this.posts.indexOf(post);
  //   if (index !== -1){
  //     this.posts.splice(index,1);
  //     this.deletePosts(post.id);
  //     console.log(post.id);
  //   }else {
  //
  //     return;
  //   }
  //   this.selectedPost = undefined;
  // }

  onDeleteFavorite(fav:Post){
    let index = this.favoritePost.indexOf(fav);
    if (index !== -1){
      this.favoritePost.splice(index,1);
    }else {
      return;
    }
    this.selectedFavoritePost = undefined;
  }

}
