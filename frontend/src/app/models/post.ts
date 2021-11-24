import {Theme} from "../enums/theme";

export class Post {

  id:number | undefined;
  user:string | undefined;
  title:string | undefined;
  description:string | undefined;
  img:string | undefined;
  theme: Theme| undefined;
  isLiked: boolean | undefined;

  constructor(id: number | undefined, user: string | undefined, title: string | undefined, description: string | undefined, img: string | undefined, theme: Theme | undefined, isLiked: boolean | undefined) {
    this.id = id;
    this.user = user;
    this.title = title;
    this.description = description;
    this.img = img;
    this.theme = theme;
    this.isLiked = isLiked;
  }


}


