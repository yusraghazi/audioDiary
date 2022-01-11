import {User} from "./user";
import {Post} from "./post";

export class Like {
  id: number;
  post: Post;
  user: User;


  constructor(id: number, post: Post, user: User) {
    this.id = id;
    this.post = post;
    this.user = user;
  }
}
