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
    router.navigate([`mapview/6`]);
    tick();
    expect(location.path()).toBe('/mapview/6');
  }));
});
