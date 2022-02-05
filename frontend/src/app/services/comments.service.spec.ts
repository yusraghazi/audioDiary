import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../app-routing.module";
import {CommentsService} from "./comments.service";
import {SingleComment} from "../models/singleComment";
import {User} from "../models/user";
import {Post} from "../models/post";
import {HttpResponse} from "@angular/common/http";



describe('CommentsService', () => {
  let service: CommentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)]
    });
    service = TestBed.inject(CommentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('Yusra test: should get 404 because of wrong argument', () => {


    service.restFindCommentByPostId(90000).subscribe((res: SingleComment[]) => {
    }, (err) => {
      expect(err).toBeTruthy();
    });

    const req = httpMock.expectOne(
      'https://audiodiary-be-team1-staging.herokuapp.com/posts/90000/comments');
    expect(req.request.method).toBe('GET');

    req.flush({
      type: 'ERROR',
      status: 404
    });
  });

  it('SHOULD NOT POST BECAUSE ', () => {
    //Arrange
    var comment = new SingleComment(88, undefined, undefined, "dddfff");


    //Act
    service.restPostComment(comment).subscribe((res: SingleComment) => {
    }, (err) => {
      expect(err).toBeTruthy();
    });

    const req = httpMock.expectOne(
      'https://audiodiary-be-team1-staging.herokuapp.com/comments');
    expect(req.request.method).toBe('POST');


    //Assert
    req.flush({
      type: 'ERROR',
      status: 404
    });
  });
  it('Should Post a comment ', async () => {
    //Arrange

    const user = new User();
    user.email = "test@hotmail.com";
    const post = new Post();
    post.id = 126;
    post.user = user
    var comment = new SingleComment(999, post, user, "dddfff");

    service.restPostComment(comment).subscribe(
      data => expect(data).toEqual(comment),
      fail
    );

    const req = httpMock.expectOne("https://audiodiary-be-team1-staging.herokuapp.com/comments");
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(comment);

    // Expect server to return the employee after POST
    const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: comment });
    req.event(expectedResponse);


  });



});
