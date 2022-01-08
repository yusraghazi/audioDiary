export class Like {
  id: number;
  post_id: number;
  user_email: string;


  constructor(id: number, post_id: number, user_email: string) {
    this.id = id;
    this.post_id = post_id;
    this.user_email = user_email;
  }
}
