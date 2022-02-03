import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {FeedviewComponent} from './feedview.component';
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {PostsService} from "../../../services/posts.service";
import {Post} from 'src/app/models/post';

/*
@Author Redouan Assakali
 */

describe('FeedviewComponent', () => {
  let component: FeedviewComponent;
  let fixture: ComponentFixture<FeedviewComponent>;
  let componentHtml: HTMLElement;

  beforeEach(async () => {
    sessionStorage.removeItem("token");
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [FeedviewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    componentHtml = fixture.debugElement.nativeElement;
  });


  it('Redouan 1: should render a postslist', fakeAsync(() => {
    //Arange preparing an empty Post Array
    let array: Post[];

    //Act asking the postService for all posts
    let postsService = fixture.debugElement.injector.get(PostsService)
    postsService.restGetPosts().subscribe((posts) => {
      array = posts
    })

  //Assert cheking if the amount of posts is equal
    expect(array).toEqual(component.posts)
  }));

  it('Redouan 2:should get post by id', fakeAsync(() => {
    //Arange preparing an empty Post
    let getpost: any;

    //Act asking the postService for post with id 126
    let postsService = fixture.debugElement.injector.get(PostsService)
    postsService.restGetPost(126).subscribe((post) => {
      getpost = post
    })

    //Assert post is equal to the post 126
    expect(getpost).toEqual(component.posts)
  }));


})


