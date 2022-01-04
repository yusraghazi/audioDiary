import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../models/post";
import {Theme} from "../../../enums/theme";
import {PostsService} from "../../../services/posts.service";


@Component({
  selector: 'app-recording-post',
  templateUrl: './recording-post.component.html',
  styleUrls: ['./recording-post.component.css']
})
export class RecordingPostComponent implements OnInit {
  @Input()
  audioPost: Post
  isShown: boolean;
  popularThemes: String[];
  theme: String;

  constructor(private postsService: PostsService) {

  }

  ngOnInit(): void {
    this.returnColor();
//     console.log(this.audioPost);
//
// switch (this.audioPost.theme) {
//   case "Theme.SUN":
//     this.audioPost.theme = Theme.SUN;
//     break;
//   case "Theme.SAND":
//     this.audioPost.theme = Theme.SAND;
//     break;
//   case "Theme.FOREST":
//     this.audioPost.theme = Theme.FOREST;
//     break;
//   case "Theme.WATER":
//     this.audioPost.theme = Theme.WATER;
//     break;
//   case "Theme.CITY":
//     this.audioPost.theme = Theme.CITY;
//     break;
//   case "Theme.MOUNTAIN":
//     this.audioPost.theme = Theme.MOUNTAIN;
//     break;
//}


  }

  getMostPopularThemes(): String[] {
    this.popularThemes = this.postsService.getTopFiveThemes();
    return this.popularThemes;
    //console.log(this.popularThemes);
  }

  async returnColor() {
    this.getMostPopularThemes();
    switch (this.audioPost.theme) {
      case this.popularThemes[0][0]:
        this.audioPost.theme = 'red'
        break;
      case this.popularThemes[1][0]:
        this.audioPost.theme = 'orange'
        break;
      case this.popularThemes[2][0]:
        this.audioPost.theme = 'yellow'
        break;
      case this.popularThemes[3][0]:
        this.audioPost.theme = 'green'
        break;
      case this.popularThemes[4][0]:
        this.audioPost.theme = 'blue'
        break;
      default:
        this.audioPost.theme = Theme.FOREST;
        break;
    }

    console.log(this.theme);
    return this.theme;
  }

  toggleShow() {

    this.isShown = ! this.isShown;

  }




}
