import { TestBed } from '@angular/core/testing';

import {PostsService} from "./posts.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../app-routing.module";
import {Post} from "../models/post";
import {constants} from "http2";

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)]
    });
    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Hanna test 02: should return a valid post info object', () => {

    service.restGetPost(24).subscribe( (res: Post) => {
      expect(res.theme).toEqual('nature');
      expect(res.lat).toEqual(52.37795600);
      expect(res.title).toEqual('rain sounds');
    });

    const req = httpMock.expectOne('https://audiodiary-be-team1-staging.herokuapp.com/posts/24');
    expect(req.request.method).toBe('GET');

  });
});
