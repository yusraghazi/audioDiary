import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent} from "./profile.component";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {PostsService} from "../../services/posts.service";
import {Router} from "@angular/router";
import {routes} from "../../app-routing.module";
import {MapviewComponent} from "../feed/mapview/mapview.component";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let postsService: PostsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)],
      declarations: [ ProfileComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    postsService = TestBed.inject(PostsService);
    router = TestBed.inject(Router);
  });

  it('should create********************************', () => {
    expect(component).toBeTruthy();
  });
});
