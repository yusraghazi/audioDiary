import {ErrorHandler, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Post} from "../models/post";
import {catchError, map, share} from "rxjs/operators";
import {environment} from "../../environments/environment.staging";


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

  // TODO: fix to load in data before function fires
  async getTopFiveThemes() {
    // await this.http.get<Post[]>(`${environment.apiUrl}/posts`).pipe(
    //    map( (postCards: any[]) => {
    //     const themes: String[] = [];
    //     for (const post of postCards) {
    //       themes.push(post.theme);
    //     }
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
    // console.log(this.result);
    // return this.result;
    // var count = {};
    // strArray.forEach(function (i) { // @ts-ignore
    //   count[i] = (count[i] || 0) + 1;
    // });

    // @ts-ignore
    // var result = Object.entries(count);
    //let findDuplicates = (arr: any[]) => arr.filter((item, index) => arr.indexOf(item) != index)
    //let set = new Set(findDuplicates(strArray));
    //let array = Array.from(set);
    // result.sort((a: any, b: any) => {
    //   return b[1] - a[1];
    // });
    // this.result = result.slice(0, 5);
    // this.themesList = themes;
    // console.log("themes loaded" + themes);
    // return themes;
    //  }));
    //console.log("result" + this.result);
    //return this.result;
    // let strArray = [ "q", "q", "w", "w", "w", "e", "i", "u", "r", "u", "u", "u"];
    // let strArray = this.themesList;
    // console.log("themes" + this.themesList);
    // var count = {};
    // strArray.forEach(function (i) { // @ts-ignore
    //   count[i] = (count[i] || 0) + 1;
    // });
    //
    // // @ts-ignore
    // var result = Object.entries(count);
    // //let findDuplicates = (arr: any[]) => arr.filter((item, index) => arr.indexOf(item) != index)
    // //let set = new Set(findDuplicates(strArray));
    // //let array = Array.from(set);
    // result.sort((a: any, b: any) => {
    //   return b[1] - a[1];
    // });
    // return result.slice(0, 5);
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
      }));
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
    // restPostPost(postId: number):Observable<Post[]> {
    //   const url = `http://localhost:8084/posts/${postId}`;
    //   return this.http.post<Post>(url, postId);
  }

  restCreateNewPost(post: Post){
    const observable = this.http.post(`${environment.apiUrl}/posts`,
      {id: post.id, user: post.user, title: post.title, description:post.description, img: post.img, theme: post.theme, isLiked: false, amountReport: 0, lng: post.lng, lat: post.lat, location: post.location, audio: post.audio}).pipe(share());

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

}
