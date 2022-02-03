import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SwitchComponent} from './switch.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../../../app-routing.module";

describe('SwitchComponent', () => {
  let component: SwitchComponent;
  let fixture: ComponentFixture<SwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)],
      declarations: [SwitchComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
//
  it('Redouan 5: should call change to mapview function on click', () => {

    //Arrange organize the click method and the button
    spyOn(component, 'click');
    let button = fixture.debugElement.nativeElement.querySelector('#toggle')

    //Act clicking on the switch button
    button.click()
    fixture.detectChanges();

    // Assert Checking if the method has been called en checking if the path is "/"
    expect(component.click).toHaveBeenCalledOnceWith();
    expect(component.router.url).toEqual('/')
  });


});
