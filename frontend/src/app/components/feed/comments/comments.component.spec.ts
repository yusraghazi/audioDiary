import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import { CommentsComponent } from './comments.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {CommentsService} from "../../../services/comments.service";
import {SingleComment} from "../../../models/singleComment";
import {Post} from "../../../models/post";
import {devOnlyGuardedExpression} from "@angular/compiler";
import {By} from "@angular/platform-browser";
import {User} from "../../../models/user";


describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let componentHtml: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule],
      declarations: [ CommentsComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    componentHtml = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Yusra test 3: should enable button if no comment typed in', () => {
    component.description = "i hate tests"
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('Yusra test 3: should send comment', fakeAsync(() => {
    const user = new User();
    user.email = "test@hotmail.com";
    const post = new Post();
    post.id = 126;
    post.user = user
    component.postInfo= post;


    component.authservice.auth(user);
    component.description = "i hate tests"
    fixture.detectChanges();

    component.sendComment()
    fixture.detectChanges();
    expect(10).toBe(10+1);
  }));


});
