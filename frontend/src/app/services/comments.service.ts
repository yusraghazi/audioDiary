import {Observable} from "rxjs";
import {Post} from "../models/post";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import {SingleComment} from "../models/singleComment";

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class CommentsService {

  constructor(private http: HttpClient) {
  }

  // restGetAllComments():Observable<Comment[]> {
  //   return this.http.get<Comment[]>(`http://localhost:8084/comments`);
  // }

  restPostComment(commentId: number):Observable<Post[]> {
    const url = `http://localhost:8084/comments/${commentId}`;
    return this.http.post<Post[]>(url, commentId);
  }

  restFindCommentByPostId(postId: number):Observable<SingleComment[]> {
    return this.http.get<SingleComment[]>(`http://localhost:8084/posts/${postId}/comments`).pipe(
    map( (commentList: any[]) => {
      const comments: SingleComment[] = [];
      for (const comment of commentList) {
        comments.push(SingleComment.trueCopy(comment));
      }
      return comments;
    }));
  }

}
