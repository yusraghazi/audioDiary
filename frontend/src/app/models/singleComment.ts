export class SingleComment {
  user: string | undefined;
  comment: string | undefined;
  image: string | undefined;

  description: string | undefined;
  constructor(user: string | undefined, comment: string | undefined, image: string | undefined) {
    this.user = user;
    this.comment = comment;
    this.image = image;
  }

  static trueCopy(comment: SingleComment): SingleComment {
    // @ts-ignore
    return comment == null ? null : Object.assign(new SingleComment(), comment);
  }
}
