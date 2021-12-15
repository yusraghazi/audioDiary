import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, filter, finalize, map, share, switchMap, take} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // do not intercept authentication attempts
    if (req.url.endsWith('rest/auth')) {
      return next.handle(req);
    } else {

      // add the token header if available
      if (this.authService.currentToken) {
        req = this.addToken(req, this.authService.currentToken);
      }

      // proceed with the request, trying to refresh the token for unauthorised requests
      return next.handle(req).pipe(
        // handle potential errors
        catchError((error: HttpErrorResponse) => {
          // if the response code is 401 (unauthorised)
          if (error && error.status === 401) {
            // force authentication if it was a failed attempt to refresh the token
            if (req.url.endsWith('rest/refresh-token')) {
              this.forceLogoff();
              return throwError(error);
            } else { /* try to refresh the token for all other attempts */
              return this.authService.refreshToken().pipe(
                switchMap((data) => {
                  // getting the returned token
                  const token = data['headers'].get('Authorization');
                  // trying again with the returned token
                  return next.handle(this.addToken(req,data['headers'].get('Authorization')));
                })
              );
            }
          } else {
            return throwError(error);
          }
        }) /* catchError */
      ); /* pipe */
    }
  }

  private forceLogoff() {
    this.authService.logout();
    this.router.navigate(['login'], {queryParams: { msg: 'session expired'}});
  }

  /**
   * Add the token header to the request. Since HttpRequests are immutable a clone is created
   * @param request
   * @param token
   * @private
   */
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
