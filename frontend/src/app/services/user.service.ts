import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.staging";
import {User} from "../models/user";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  restGetUser(email: String):Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${email}`);
  }

  getAmountOfUsers() {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`).pipe(
      map( (postCards: any[]) => {
        const posts: Post[] = [];
        for (const post of postCards) {
          posts.push(post);
        }
        return posts.length;
      }));
  }

  getUsers():Observable<User[]> {

    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  delete(user: User):Observable<User>  {
    return this.http.delete<User>(`${environment.apiUrl}/users/${user.email}`);
  }

  updateUser(user: User) {
    return this.http.put(`${environment.apiUrl}/users`, user)
  }
}
