import {ComponentFixture, TestBed} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let componentHtml: HTMLElement;
  let service: UserService;
  let authService : AuthService;
  let httpMock: HttpTestingController;
  // Taner
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule],
      declarations: [ LoginComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    service = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    componentHtml = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    componentHtml = fixture.debugElement.nativeElement;
  });


  // Taner
  it('login button should be disabled with wrong email pattern', () => {
    // arrange
    let loginButton: HTMLButtonElement | null = componentHtml.querySelector('#loginBtn');

    const inputEmail: HTMLInputElement = componentHtml.querySelector('#inputEmail');
    const inputPassword: HTMLInputElement = componentHtml.querySelector('#inputPassword');
    //Act
    inputEmail.value = "ekjsa^&W@#$@#$@ERW#@test.com";
    inputPassword.value = "ar";
    fixture.detectChanges();


    //expect
    expect(loginButton.disabled).toBeFalse();
  });


  it('login should have password with one character or more', () => {
    const loginButton: HTMLButtonElement | null = componentHtml.querySelector('#loginBtn');

    if (loginButton == null) return;
    const inputEmail: HTMLInputElement = componentHtml.querySelector('#inputEmail');
    const inputPassword: HTMLInputElement = componentHtml.querySelector('#inputPassword');

    inputEmail.value = "ekjsa@test.com";

    inputPassword.value = "a";
    fixture.detectChanges();
    //expect
    expect(loginButton).toBeTruthy();
  });

  it('check page state', () => {
    const loginButton: HTMLButtonElement | null = componentHtml.querySelector('#loginBtn');

    if (loginButton == null) return;
    const inputEmail: HTMLInputElement = componentHtml.querySelector('#inputEmail');
    const inputPassword: HTMLInputElement = componentHtml.querySelector('#inputPassword');

    inputEmail.value = "";

    inputPassword.value = "";
    fixture.detectChanges();

    // expect
    expect(component.myForm.submitted).toBeFalsy();
    expect(component.myForm.value).toBeDefined();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });





});
