export class SingleComment {
  user: string | undefined;
  comment: string | undefined;
  image: string | undefined;

  constructor(user: string | undefined, comment: string | undefined, image: string | undefined) {
    this.user = user;
    this.comment = comment;
    this.image = image;
  }
}