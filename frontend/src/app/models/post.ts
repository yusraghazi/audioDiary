import {User} from "./user";

export class Post {
  private _id:number | null;
  private _user:User | null;
  private _title:string | null;
  private _description:string | null;
  _img:string | null;
  private _theme: string| null;
  private _isLiked: boolean | null;
  private _amountReport: number | null;
  private _lng: number | null;
  private _lat: number | null;
  private _location: string | null;
  private _audiofile: string | null;

  constructor() {}


  // constructor(id: number | undefined, user: User | undefined, title: string | undefined, description: string | undefined, img: string | undefined, theme: string | undefined, isLiked: boolean | undefined, lng: number | undefined, lat: number | undefined) {
  //   this.id = id;
  //   this.user = user;
  //   this.title = title;
  //   this.description = description;
  //   this.img = img;
  //   this.theme = theme;
  //   this.isLiked = isLiked;
  //   this.lng = lng;
  //   this.lat = lat;
  // }

// constructor(id: number | undefined, user: string | undefined, title: string | undefined, description: string | undefined, img: string | undefined, theme: string | undefined, isLiked: boolean | undefined) {
  //   this.id = id;
  //   this.user = user;
  //   this.title = title;
  //   this.description = description;
  //   this.img = img;
  //   this.theme = theme;
  //   this.isLiked = isLiked;
  //   this.lng =
  //   lat: number | undefined;
  // }


  get id(): number | undefined {
    return this._id;
  }

  set id(value: number | undefined) {
    this._id = value;
  }

  get user(): User | undefined {
    return this._user;
  }

  set user(value: User | undefined) {
    this._user = value;
  }

  get title(): string | undefined {
    return this._title;
  }

  set title(value: string | undefined) {
    this._title = value;
  }

  get description(): string | undefined {
    return this._description;
  }

  set description(value: string | undefined) {
    this._description = value;
  }

  get img(): string | undefined {
    return this._img;
  }

  set img(value: string | undefined) {
    this._img = value;
  }

  get theme(): string | undefined {
    return this._theme;
  }

  set theme(value: string | undefined) {
    this._theme = value;
  }

  get isLiked(): boolean | undefined {
    return this._isLiked;
  }

  set isLiked(value: boolean | undefined) {
    this._isLiked = value;
  }

  get lng(): number | undefined {
    return this._lng;
  }

  set lng(value: number | undefined) {
    this._lng = value;
  }

  get lat(): number | undefined {
    return this._lat;
  }

  set lat(value: number | undefined) {
    this._lat = value;
  }





  get amountReport(): number | null {
    return this._amountReport;
  }

  set amountReport(value: number | null) {
    this._amountReport = value;
  }


  get location(): string | null {
    return this._location;
  }

  set location(value: string | null) {
    this._location = value;
  }


  get audiofile(): string | null {
    return this._audiofile;
  }

  set audiofile(value: string | null) {
    this._audiofile = value;
  }
}
