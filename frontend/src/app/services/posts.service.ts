import {ErrorHandler, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {Post} from "../models/post";
import {catchError, map, share} from "rxjs/operators";
import {environment} from "../../environments/environment.staging";
import {Formattedpost} from "../models/formattedpost";


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class PostsService {

  posts: Post[];
  themesList: String[];
  result: any = "noting";

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
        this.posts = posts;
        return posts;
      }));
  }

  getAllThemes():Observable<String[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`).pipe(
      map( (postCards: any[]) => {
        const themes: String[] = [];
        for (const post of postCards) {
          themes.push(post.theme);
        }
        return themes;
      }));
  }

  async getTopFiveThemes() {
    let strArray = await this.getAllThemes();
    return new Promise(resolve =>
      strArray.pipe().subscribe(
        (data) => {
          var count = {};
          data.forEach(function (i) { // @ts-ignore
            count[i] = (count[i] || 0) + 1;
          });

          var result = Object.entries(count);
          result.sort((a: any, b: any) => {
            return b[1] - a[1];
          });

          this.result = result.slice(0, 5);
          resolve(this.result);
        }));
  }

  getPostsByTheme(theme: string):Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`).pipe(
      map( (postCards: any[]) => {
        const posts: Post[] = [];
        for (const post of postCards) {
          if (post.theme == theme) {
            posts.push(post);
          }
        }
        this.posts = posts;
        return posts;
      }),
      catchError(this.handleError));
  }

  getReportedPosts():Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`).pipe(
      map( (postCards: any[]) => {
        const posts: Post[] = [];
        for (const post of postCards) {
          if (post.amountReport > 0) {
            posts.push(post);
          }
        }
        return posts.sort((a: Post, b: Post) => {
          return b.amountReport - a.amountReport;
        });
      }));
  }

  restGetPost(postId: number):Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}/posts/${postId}`);
  }

  restGetPostTest(postId: number):Observable<Formattedpost[]> {
    return this.http.get<Formattedpost[]>(`${environment.apiUrl}/posts/${postId}`).pipe(catchError(this.handleError));
  }

  restGetPostsOfUser(email: string) {
    return this.http.get<Post[]>(`${environment.apiUrl}/users/${email}/posts`).pipe(
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
  }

  restCreateNewPost(post: Post){
    const observable = this.http.post(`${environment.apiUrl}/posts`,
      {id: post.id, user: post.user, title: post.title, description:post.description, img: post.img, theme: post.theme, isLiked: false, amountReport: 0, lng: post.lng, lat: post.lat, location: post.location, audiofile: post.audiofile}).pipe(share());

    observable.subscribe((data) => {
        console.log(data);
      },
      (err) => {
        console.log('creation error', err);
      });

    return observable;
  }


  restPutPost(post: Post):Observable<Post[]> {
    console.log(post);
    const url = `${environment.apiUrl}/posts/${post.id}`;
    return this.http.put<Post[]>(url, post);
  }

  restDeletePosts(postId: number):Observable<Post> {
    const url = `${environment.apiUrl}/posts/${postId}`;
    return this.http.delete<Post>(url);
  }

  /**
   * Based on angular.io
   * @param error error
   */
  private handleError(error: HttpErrorResponse) {
    let message: string;
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      message = error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if(error.status === 0) {
        message = 'backend error: status: ' + error.message;
      } else {
        message = 'backend error: status: ' + error.status + ' - ' + error.statusText;
      }
    }
    // return an observable with a user-facing error message
    return throwError(message);
  };

}
