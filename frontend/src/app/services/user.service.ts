import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  restGetUser(userId: number):Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}/users/${userId}`);
  }
}
