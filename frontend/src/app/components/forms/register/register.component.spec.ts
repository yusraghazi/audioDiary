import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {LoginComponent} from "../login/login.component";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
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
      declarations: [ RegisterComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    service = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();

  });
  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    componentHtml = fixture.debugElement.nativeElement;
  });


// Taner
  it('it should create an account', () => {
    // arrange
    let registerButton: HTMLButtonElement | null = componentHtml.querySelector('#registerBtn');

    const inputEmail: HTMLInputElement = componentHtml.querySelector('#inputEmail');
    const inputUsername: HTMLInputElement = componentHtml.querySelector('#inputUsername');
    const inputPassword: HTMLInputElement = componentHtml.querySelector('#inputPassword');
    //Act
    inputEmail.value = "ekjsa^&W@#$@#$@ERW#@test.com";
    inputUsername.value= "vetteTest";
    inputPassword.value = "arhh";

    fixture.detectChanges();


    //expect
    expect(registerButton).toBeTruthy();
  });


  it('deny update when only 1 field is entered in', () => {
    let registerButton: HTMLButtonElement | null = componentHtml.querySelector('#registerBtn');

    const inputEmail: HTMLInputElement = componentHtml.querySelector('#inputEmail');
    const inputUsername: HTMLInputElement = componentHtml.querySelector('#inputUsername');
    const inputPassword: HTMLInputElement = componentHtml.querySelector('#inputPassword');

    inputEmail.value = "veriverinice@hotmail.com";
    inputUsername.value= "";
    inputPassword.value = "";
    fixture.detectChanges();
    //expect
    expect(registerButton.disabled).toBeFalse();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
