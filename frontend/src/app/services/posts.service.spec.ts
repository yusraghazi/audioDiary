import { TestBed } from '@angular/core/testing';

import {PostsService} from "./posts.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../app-routing.module";
import {Post} from "../models/post";
import {Formattedpost} from "../models/formattedpost";

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

  it('Hanna test 03: should return a valid post info object', async () => {

    const dummyData = {
      id: 24,
      title: "rain sounds",
      description: "listen to the relaxing rain sounds while walking through the forest",
      img: "ewa-diary_xag1cf",
      theme: "nature",
      isLiked: false,
      amountReport: 1,
      lng: 4.89707000,
      lat: 52.37795600,
      location: "Martelaarsgracht, 1012, Amsterdam (Nieuwezijde)\r\nNieuwezijde, Amsterdam Amsterdam Nederland",
      audiofile: "audio_kylri9",
      user: {
        email: "pipo@hotmail.com",
        name: "Pipo de clown",
        encodedPassword: "fd8cc779bce474283c3ec89ef0ee9340b979e150d515b04796decedd809b0638",
        admin: false,
        username: "pipodeclown123",
        passwordReset: "null",
        verified: false
      },
      liked: false
    };

    await service.restGetPostTest(24).subscribe( (res: Formattedpost[]) => {
      expect(res[0].theme).toEqual('nature');
      expect(res[0].lat).toEqual(52.37795600);
      expect(res[0].title).toEqual('rain sounds');
    });

    const req = httpMock.expectOne('https://audiodiary-be-team1-staging.herokuapp.com/posts/24');
    expect(req.request.method).toBe('GET');
    req.flush([dummyData]);
  });

  it('Hanna test 04: should generate an exception due to wrong argument', () => {

    service.restGetPostTest(90000).subscribe( (res: Formattedpost[]) => {}, (err) => {
      expect(err).toBeTruthy();
    });

    const req = httpMock.expectOne(
      'https://audiodiary-be-team1-staging.herokuapp.com/posts/90000');
    expect(req.request.method).toBe('GET');

    req.flush({
      type: 'ERROR',
      status: 404
    });
  });

});
