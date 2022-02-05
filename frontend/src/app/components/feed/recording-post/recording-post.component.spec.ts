import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingPostComponent } from './recording-post.component';
import {FeedviewComponent} from "../feedview/feedview.component";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {Post} from "../../../models/post";

describe('RecordingPostComponent', () => {
  let component: RecordingPostComponent;
  let fixture: ComponentFixture<RecordingPostComponent>;
  let componentHtml: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [ RecordingPostComponent ]
    })
    .compileComponents();
    let post = component.audioPost;
    post.id = 126;
    post.title = "Sound of Arwina"
    post.description = "When you wake....";
    post.img = "download_cvgxpn";
    post.theme = "nature";
    post.isLiked = false;
    post.lng = 138.72905000;
    post.lat = 35.36063800;
    post.location = "Mount Fuji, Honshu, Japan";
    post.audiofile = "audio_ydaczk";
    post.user = null;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordingPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   let post = component.audioPost;
        post.id = 126;
        post.title = "Sound of Arwina"
        post.description = "When you wake....";
        post.img = "download_cvgxpn";
        post.theme = "nature";
        post.isLiked = false;
        post.lng = 138.72905000;
        post.lat = 35.36063800;
        post.location = "Mount Fuji, Honshu, Japan";
        post.audiofile = "audio_ydaczk";
        post.user = null;


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
