import {User} from "./user";
import {Audio} from "./audio";

export class Formattedpost {
  private id: number | null;
  private user: User | null;
  private title: string | null;
  private description: string | null;
  private img: string | null;
  private theme: string | null;
  private isLiked: boolean | null;
  private amountReport: number | null;
  private lng: number | null;
  private lat: number | null;
  private location: string | null;
  private audiofile: string | null;

  constructor() {

  }

}
