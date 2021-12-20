export class SingleComment {
  id: number | undefined
  user: string | undefined;
  description: string | undefined;
  image: string | undefined;

  constructor(user: string | undefined, description: string | undefined) {
    this.user = user;
    this.description = description;
  }

  static trueCopy(comment: SingleComment): SingleComment {
    // @ts-ignore
    return comment == null ? null : Object.assign(new SingleComment(), comment);
  }
}
