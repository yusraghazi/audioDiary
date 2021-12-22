import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.staging";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  restGetUser(userId: number):Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}/users/${userId}`);
  }

  getUsers() {

    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  delete(user: User) {
    return this.http.delete<User>(`${environment.apiUrl}/users/${user.email}`);
  }

  updateUser(user: User) {
    return this.http.put(`${environment.apiUrl}/users`, user)
  }
}
