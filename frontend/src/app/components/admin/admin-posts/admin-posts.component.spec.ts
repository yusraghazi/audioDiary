import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostsComponent } from './admin-posts.component';
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {Formattedpost} from "../../../models/formattedpost";
import {PostsService} from "../../../services/posts.service";
import {AuthService} from "../../../services/auth.service";
import {By} from "@angular/platform-browser";
import {User} from "../../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {NgZone} from "@angular/core";

describe('AdminLocationComponent', () => {
  let component: AdminPostsComponent;
  let fixture: ComponentFixture<AdminPostsComponent>;
  let router: Router;
  let activateRoute: ActivatedRoute;
  // let ngZone: NgZone;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule, HttpClientTestingModule],
      declarations: [ AdminPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPostsComponent);
    component = fixture.componentInstance;
    activateRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Hanna test 02: should download the json file', () => {
    // create spy object with a click() method
    const spyObj = jasmine.createSpyObj('a', ['click']);
    // spy on document.createElement() and return the spy object
    spyOn(document, 'createElement').and.returnValue(spyObj);
    component.downloadObjectAsJson();
    expect(document.createElement).toHaveBeenCalledTimes(1);
    expect(document.createElement).toHaveBeenCalledWith('a');
  });

  it('Hanna Test 03: test if table is visible', () => {
    // dummy data
    component.currentAdmin.verified = false;

    expect(fixture.debugElement.query(By.css('.table'))).toBeNull();

    component.currentAdmin.verified = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.table'))).toBeDefined();
  });

  // it('Hanna Test 03: test if router works', (done) => {
  //   //TODO: fix
  //     router.navigateByUrl('/admin/location').then(() => {
  //       const arrayPath = component.getCurrentRouterPath();
  //       expect(arrayPath).not.toBeNull();
  //       expect(arrayPath).not.toBeUndefined();
  //       expect(arrayPath.length).toEqual(2);
  //
  //       done(); // mark the test as done
  //     });
  // });
});
