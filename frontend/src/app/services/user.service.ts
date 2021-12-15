import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.staging";
import {User} from "../models/user";
import {share} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  restGetUser(userId: number):Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}/users/${userId}`);
  }

  updateUser(user: User) {
    const observable = this.http.put(`${environment.apiUrl}/users`,
      {email: user.email, username: user.username, encoded_password: user.password}).pipe(share());

    observable.subscribe((data) => {
      console.log("data" + data);
      },
      (err) => {
        console.log('creation error', err);
      });

    return observable;
    // return this.http.put<User>(`${environment.apiUrl}/users/${email}`, email);
  }

  getUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  delete(user: User) {
    return this.http.delete<User>(`${environment.apiUrl}/users/${user.email}`);
  }
}
