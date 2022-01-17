import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSettingsComponent } from './profile-settings.component';
import {LoginComponent} from "../forms/login/login.component";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {HttpTestingController} from "@angular/common/http/testing";

describe('ProfileSettingsComponent', () => {
  let component: ProfileSettingsComponent;
  let fixture: ComponentFixture<ProfileSettingsComponent>;
  let componentHtml: HTMLElement;
  let service: UserService;
  let authService : AuthService;
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSettingsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  // Taner
  it('Update should have all fields inputted ', () => {
    // Arrange
    const updateButton: HTMLButtonElement | null = componentHtml.querySelector('#updateBtn');

    if (updateButton == null) return;
    const inputUsername: HTMLInputElement = componentHtml.querySelector('#userName');
    const inputName: HTMLInputElement = componentHtml.querySelector('#name');
    const inputPassword: HTMLInputElement = componentHtml.querySelector('#password');

    // Act
    inputUsername.value = "deloer";
    inputName.value = "vet";
    inputPassword.value = "voer";
    fixture.detectChanges();

    // Assert
    expect(updateButton.disabled).toBeTruthy();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
