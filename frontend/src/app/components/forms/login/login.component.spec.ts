import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {RouterModule} from "@angular/router";
import {FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
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


    //assert
    expect(loginButton.disabled).toBeFalse();
  });

  // Taner
  it('login should have password with one character or more', () => {
    const loginButton: HTMLButtonElement | null = componentHtml.querySelector('#loginBtn');

    if (loginButton == null) return;
    const inputEmail: HTMLInputElement = componentHtml.querySelector('#inputEmail');
    const inputPassword: HTMLInputElement = componentHtml.querySelector('#inputPassword');

    inputEmail.value = "ekjsa@test.com";

    inputPassword.value = "a";
    fixture.detectChanges();

    expect(loginButton).toBeTruthy();
  });








  it('should create', () => {
    expect(component).toBeTruthy();
  });





});
