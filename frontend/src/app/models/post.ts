import {User} from "./user";
import {Audio} from "./audio";

export class Post {
  id: number;
  user: User;
  title: string;
  description: string;
  img: string;
  theme: string;
  isLiked: boolean;
  amountReport: number;
  lng: number;
  lat: number;
  location: string;
  audio: Audio;

  constructor() {
  }


  // constructor(id: number, user: User, title: string, description: string, img: string, theme: string, isLiked: boolean, amountReport: number, lng: number, lat: number, audio: Audio) {
  //   this.id = id;
  //   this.user = user;
  //   this.title = title;
  //   this.description = description;
  //   this.img = img;
  //   this.theme = theme;
  //   this.isLiked = isLiked;
  //   this.amountReport = amountReport;
  //   this.lng = lng;
  //   this.lat = lat;
  //   this.audio = audio;
  // }

}


