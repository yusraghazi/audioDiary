import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostsComponent } from './admin-posts.component';
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('AdminLocationComponent', () => {
  let component: AdminPostsComponent;
  let fixture: ComponentFixture<AdminPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule],
      declarations: [ AdminPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Hanna test 03: should download the json file', () => {
    // create spy object with a click() method
    const spyObj = jasmine.createSpyObj('a', ['click']);
    // spy on document.createElement() and return the spy object
    spyOn(document, 'createElement').and.returnValue(spyObj);
    component.downloadObjectAsJson();
    expect(document.createElement).toHaveBeenCalledTimes(1);
    expect(document.createElement).toHaveBeenCalledWith('a');

    // expect(spyObj.href).toContain('data:text/json;charset=utf-8');
    // expect(spyObj.download).toBe('GEO.json');
    // expect(spyObj.click).toHaveBeenCalledTimes(1);
    // expect(spyObj.click).toHaveBeenCalledWith();
  });
});
