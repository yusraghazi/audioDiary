import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {environment} from "../../environments/environment.staging";
import {map} from "rxjs/operators";
import {Like} from "../models/like";
import {HttpClient} from "@angular/common/http";
import {SingleComment} from "../models/singleComment";

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class LikesService {

  likes: Like[];

  constructor(private http: HttpClient) {
    this.restGetLikes();
  }

  restGetLikes():Observable<Like[]> {
    return this.http.get<Like[]>(`${environment.apiUrl}/likes`).pipe(
      map( (likeList: any[]) => {
        const likes: Like[] = [];
        for (const like of likeList) {
          likes.push(like);
        }
        this.likes = likes;
        console.log(likes);
        return likes;
      }));
  }

  getFavorites(email: string):Observable<Like[]> {
    return this.http.get<Like[]>(`${environment.apiUrl}/likes/email/${email}`).pipe(
      map( (likeList: any[]) => {
        const likes: Like[] = [];
        for (const like of likeList) {
          likes.push(like);
        }
        this.likes = likes;
        console.log(likes);
        return likes;
      }));
  }

  restPostLike(like: Like):Observable<Like> {
    const url = `${environment.apiUrl}/likes`;
    return this.http.post<Like>(url, like);
  }

  restRemoveLike(likeId: number):Observable<Like> {
    const url = `${environment.apiUrl}/likes/${likeId}`;
    return this.http.delete<Like>(url);
  }

  restGetLike(likeId: number):Observable<Like> {
    return this.http.get<Like>(`${environment.apiUrl}/posts/${likeId}`);
  }

}
