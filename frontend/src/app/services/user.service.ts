import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  restGetUser(userId: number):Observable<Post> {
    return this.http.get<Post>(`http://localhost:8084/users/${userId}`);
  }
}
