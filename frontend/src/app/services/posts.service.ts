import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {catchError, map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class PostsService {

  constructor(private http: HttpClient) {
    this.restGetPosts();
  }

  restGetPosts():Observable<Post[]> {
    return this.http.get<Post[]>("http://localhost:8083/aevents").pipe(
      map( (events: any[]) => {
        const aEvents: Post[] = [];
        for (const event of events) {
          //aEvents.push(Post.trueCopy(event));
        }
        return aEvents;
      }));
  }

  restGetPost(aEventId: number):Observable<Post[]> {
    return this.http.get<Post[]>(`http://localhost:8083/aevents/${aEventId}`);
  }

  restPostPost(aEvent: Post):Observable<Post[]> {
    const url = `http://localhost:8083/aevents/${aEvent.id}`;
    return this.http.post<Post[]>(url, aEvent);
  }

  restPutPost(post: Post):Observable<Post[]> {
    console.log(post);
    const url = `http://localhost:8083/aevents/${post.id}`;
    return this.http.put<Post[]>(url, post);
  }

  restDeletePosts(postId: number):void {
    const url = `http://localhost:8083/aevents/${postId}`;
    this.http.delete<Post[]>(url);
  }

}
