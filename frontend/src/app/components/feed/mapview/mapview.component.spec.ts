import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { MapviewComponent } from './mapview.component';
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {routes} from "../../../app-routing.module";
import {Location} from '@angular/common';
import {PostsService} from "../../../services/posts.service";
import {of} from "rxjs";
import {Post} from "../../../models/post";
import {Formattedpost} from "../../../models/formattedpost";

describe('MapviewComponent', () => {
  let component: MapviewComponent;
  let fixture: ComponentFixture<MapviewComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)],
      declarations: [ MapviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Hanna Test 01: Should go to the right child component', fakeAsync(() => {
    let id = 6;
    router.navigate([`mapview/${id}`]);
    tick();
    expect(location.path()).toBe('/mapview/6');
  }));

  it('Hanna Test 02: mocking a service with a spy', (done) => {
    const dummyData: Formattedpost = {
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
        verified: false,
        exp: 1,
    },
    };

    const postsService = fixture.debugElement.injector.get(PostsService);
    const spy = spyOn(postsService, 'getTopFiveThemes');

    component.getMostPopularThemes();
    expect(postsService.getTopFiveThemes).toHaveBeenCalled();
    // spy.calls.mostRecent().returnValue.subscribe( () => {
    //   expect(component.posts[0].id).toBe(24);
    //   expect(component.posts[0].title).toBe('rain sounds');
    //   done();
    // })
  });
});
