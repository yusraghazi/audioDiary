import {Component, OnInit} from '@angular/core';
import {Post} from "../../../models/post";
import {Theme} from "../../../enums/theme";

@Component({
  selector: 'app-feedview',
  templateUrl: './feedview.component.html',
  styleUrls: ['./feedview.component.css']
})
export class FeedviewComponent implements OnInit {
  posts: Post[];
  text: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  constructor() {
  }

  ngOnInit(): void {
    this.posts =[];
    this.posts.push(new Post(1, "River Sounds", this.text,"river.jpg",Theme.SUN, true))
    this.posts.push(new Post(2, "Brown Mountains", this.text,"mountain.jpg",Theme.MOUNTAIN, false))
    this.posts.push(new Post(2, "Amazon Birds", this.text,"amazon.jpg",Theme.FOREST, true))
    this.posts.push(new Post(2, "Sound of Waves", this.text,"seawaves.jpg",Theme.WATER, false))
    this.posts.push(new Post(2, "Sand storm", this.text,"sandstorm.jpg",Theme.SAND, true))
    this.posts.push(new Post(2, "Amsterdam bikes", this.text,"amsterdamBikes.jpg",Theme.CITY, false))
  }

}
