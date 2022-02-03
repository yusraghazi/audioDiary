import {fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {AuthService} from "./auth.service";
import {User} from "../models/user";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
  });


  it('Redouan 3:should perform login correctly', inject(
    [AuthService, HttpTestingController],
    (authService: AuthService, backend: HttpTestingController) => {

      //Arange organize the data user email and encodedPassword
      const user = new User();
      user.email = 'admin@userdairy.com';
      user.encodedPassword = '2A5C5F2623024CE3DE6FE7DC8F5E13CA55B7AADC13174254B40AF574E37018C1';

      //Act Call for login with the valid username and password
      authService.auth(user)

      //Assert Check if user is logged-in and authService get user
      expect(authService.isLoggedIn).toBeTruthy()
      expect(authService.getUser()).toBeDefined();


    }));

  it(
    'Redouan 4:should not login ', fakeAsync(inject([AuthService, HttpTestingController],
        (authService: AuthService, backend: HttpTestingController) => {

          //Arange organize the invalid-data user email and encodedPassword
          let user = new User();
          user.email = 'admin@userdasdiry.com';
          user.encodedPassword = '2A5C5F2623024CE3DE6FE7DC8F5E13CA55B7AADC13174254B40AF574E37018C1';

          //Act Call for login with the invalid username and password
          authService.auth(user)

          const requestWrapper = backend.expectOne({url: 'https://audiodiary-be-team1-staging.herokuapp.com/auth'});
          tick();

          //Assert Check if user is logged-in faild and there is no session storage
          expect(requestWrapper.request.method).toEqual('POST');
          expect(sessionStorage.length).toBe(0);

        }
      )
    )
  );

});
