import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/post";
import {Theme} from "../../enums/theme";
declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  posts!: Post[];
  favoritePost!: Post[];



  selectedPost: Post | undefined;
  selectedFavoritePost: Post | undefined;

  text: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  constructor() { }

  ngOnInit(): void {
    this.posts =[];
    this.posts.push(new Post(1, "River Sounds", this.text,"river.jpg",Theme.SUN, true))
    this.posts.push(new Post(3, "Amazon Birds", this.text,"amazon.jpg",Theme.FOREST, true))
    this.posts.push(new Post(4, "Sound of Waves", this.text,"seawaves.jpg",Theme.WATER, false))
    this.posts.push(new Post(5, "Sound of Waves", this.text,"seawaves.jpg",Theme.MOUNTAIN, false))

    this.favoritePost =[];
    this.favoritePost.push(new Post(1, "River Sounds", this.text,"river.jpg",Theme.SUN, true))
    this.favoritePost.push(new Post(3, "Amazon Birds", this.text,"amazon.jpg",Theme.FOREST, true))
    this.favoritePost.push(new Post(4, "Sound of Waves", this.text,"seawaves.jpg",Theme.WATER, false))


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

  onDelete(post: Post ){
    let index = this.posts.indexOf(post);
    if (index !== -1){
      this.posts.splice(index,1);
    }else {
      return;
    }
    this.selectedPost = undefined;
  }

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
