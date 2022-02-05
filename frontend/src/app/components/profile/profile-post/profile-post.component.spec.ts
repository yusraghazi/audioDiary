import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostComponent} from "./profile-post.component";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {PostsService} from "../../../services/posts.service";

describe('ProfilePostComponent', () => {
  let component: ProfilePostComponent;
  let fixture: ComponentFixture<ProfilePostComponent>;
  let postsService: PostsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule],
      declarations: [ ProfilePostComponent ],
      providers: [
        {provide: PostsService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePostComponent);
    component = fixture.componentInstance;
    postsService = TestBed.inject(PostsService);
    fixture.detectChanges();
  });

  it('should create????????????', () => {
    expect(component).toBeTruthy();
  });
});
