import {User} from "./user";
import {Post} from "./post";

export class SingleComment {
  id: number | undefined;
  post: Post | undefined;
  user: User | undefined;
  description: string | undefined;


  constructor(id: number | undefined, post: Post | undefined, user: User | undefined, description: string | undefined) {
    this.id = id;
    this.post = post;
    this.user = user;
    this.description = description;
  }

  static trueCopy(comment: SingleComment): SingleComment {
    // @ts-ignore
    return comment == null ? null : Object.assign(new SingleComment(), comment);
  }
}
