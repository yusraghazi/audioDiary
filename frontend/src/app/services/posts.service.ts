import {ErrorHandler, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {catchError, map} from "rxjs/operators";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class PostsService {

  constructor(private http: HttpClient) {
    this.restGetPosts();
  }

  restGetPosts():Observable<Post[]> {

    return this.http.get<Post[]>(`${environment.apiUrl}/posts`).pipe(
      map( (postCards: any[]) => {
        const posts: Post[] = [];
        for (const post of postCards) {
          posts.push(post);
        }
        return posts;
      }));
  }

  restGetPost(postId: number):Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}/posts/${postId}`);
  }

  restGetPostsOfUser(userId: number) {
    return this.http.get<Post[]>(`${environment.apiUrl}/users/${userId}/posts`).pipe(
      map( (postList: any[]) => {
        const posts: Post[] = [];
        for (const post of postList) {
          posts.push(post);
        }
        return posts;
      }));
  }

  restPostPost(postId: number):Observable<Post[]> {
    const url = `${environment.apiUrl}/posts/${postId}`;
    return this.http.post<Post[]>(url, postId);
  // restPostPost(postId: number):Observable<Post[]> {
  //   const url = `http://localhost:8084/posts/${postId}`;
  //   return this.http.post<Post>(url, postId);
  }

  restCreateNewPost(postId: number):Observable<Post>{
    const url = `http://localhost:8084/posts/create/${postId}`;
    return this.http.post<Post>(url, postId);
  }

  restPutPost(post: Post):Observable<Post[]> {
    console.log(post);
    const url = `${environment.apiUrl}/posts/${post.id}`;
    return this.http.put<Post[]>(url, post);
  }

  restDeletePosts(postId: number):void {
    const url = `${environment.apiUrl}/posts/${postId}`;
    this.http.delete<Post[]>(url);
  }

}
