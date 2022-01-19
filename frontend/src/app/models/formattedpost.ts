import {User} from "./user";
import {Audio} from "./audio";

export class Formattedpost {
  public id: number | null;
  public user: User | null;
  public title: string | null;
  public description: string | null;
  public img: string | null;
  public theme: string | null;
  public isLiked: boolean | null;
  public amountReport: number | null;
  public lng: number | null;
  public lat: number | null;
  public location: string | null;
  public audiofile: string | null;

  constructor() {

  }

}
