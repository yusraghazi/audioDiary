export class SingleComment {
  user: string | undefined;
  description: string | undefined;
  image: string | undefined;

  constructor(user: string | undefined, description: string | undefined, image: string | undefined) {
    this.user = user;
    this.description = description;
    this.image = image;
  }

  static trueCopy(comment: SingleComment): SingleComment {
    // @ts-ignore
    return comment == null ? null : Object.assign(new SingleComment(), comment);
  }
}
