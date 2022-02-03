import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {EditingComponent} from './editing.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {RouterModule} from "@angular/router";
import {FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "../forms/login/login.component";
import {async, of} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {name} from "@cloudinary/url-gen/actions/namedTransformation";
import {PostsService} from "../../services/posts.service";
import {Location} from "@angular/common";
import {By} from "@angular/platform-browser";
import {title} from 'process';
import {routes} from "../../app-routing.module";
import {coneMonochromacy} from "@cloudinary/url-gen/qualifiers/simulateColorBlind";


describe('EditingComponent', () => {
  let component: EditingComponent;
  let fixture: ComponentFixture<EditingComponent>;
  let componentHtml: HTMLElement;
  let location: Location;

  beforeEach(async () => {


    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        RouterModule.forRoot([]),
        ReactiveFormsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
      ],
      declarations: [EditingComponent]
    })
      .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(EditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    componentHtml = fixture.debugElement.nativeElement;
    location = TestBed.inject(Location);

  });


  function setInputValue(selector: string, value: string) {
    fixture.detectChanges();
    tick();

    let input = fixture.debugElement.query(By.css(selector)).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    tick();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Altaaf Test 01: tesTitle inputfield should update', fakeAsync(() => {


    setInputValue('#cardEditTitle', 'test');

    const titlePreview = fixture.debugElement.query(By.css('#pcTitle'));

    console.log("this is the totle value " + componentHtml.querySelector('#pcTitle').textContent);

    fixture.detectChanges();

    console.log("this is the totle value " + titlePreview.nativeElement.textContent.trim());

    expect(titlePreview.nativeElement.textContent.trim()).toBe('test')


  }));

  it('Altaaf Test 02: Should navigate to feedview after creating a post', fakeAsync(() => {

    spyOn(component, 'postButton')

    fixture.detectChanges();

    let button = fixture.debugElement.query(By.css('#postButton')).nativeElement
    button.click()

    expect(component.postButton).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      expect(location.path()).toContain('/feedview');
    });

  }));


  it('Altaaf Test 03: Record and stop recording buttons should be displayed/hidden as intended', fakeAsync(() => {

    spyOn(component, 'initiateRecording');

    let recordButton = fixture.debugElement.query(By.css('#recordButton')).nativeElement;

    fixture.detectChanges();

    //the button to record should be displayed at first
    expect(recordButton).toBeTruthy();

    //clicking on the record button
    recordButton.click;

    fixture.detectChanges();


    fixture.whenStable().then(() => {
        //after clicking record, methode initiateRecording should have been called
        expect(component.initiateRecording).toHaveBeenCalled();


        tick(1000);

        let stopButton = fixture.debugElement.query(By.css('#stopRecordButton')).nativeElement;

        //Now the record button should be hidden and the stop button should be displayed
        expect(recordButton).toBeFalsy()
        expect(stopButton).toBeTruthy();

        tick(1000);

        //click to stop the recording
        stopButton.click;

      }
    )

    fixture.detectChanges()
    //after clicking stop, the displayed button should be for recording again
    expect(recordButton).toBeTruthy();

  }));





  //TODO: fix value from inputAudioFile
  it('Altaaf Test 04: After clicking stop recording the audio file should be in the file selector', fakeAsync(() => {

    spyOn(component, 'initiateRecording');

    let fileInput = fixture.debugElement.query(By.css('#fileInputAudio')).nativeElement;

    let recordButton = fixture.debugElement.query(By.css('#recordButton')).nativeElement;

    fixture.detectChanges();

    expect(fileInput).toBeTruthy();

    expect(fileInput.value).toBe("");
    console.log("this is the fileinput ------>>>>>>" + fileInput)


    //the button to record should be displayed at first
    expect(recordButton).toBeTruthy();

    //clicking on the record button
    recordButton.click;

    fixture.detectChanges();


    fixture.whenStable().then(() => {
        //after clicking record, methode initiateRecording should have been called
        expect(component.initiateRecording).toHaveBeenCalled();


        tick(1000);

        let stopButton = fixture.debugElement.query(By.css('#stopRecordButton')).nativeElement;

        //Now the record button should be hidden and the stop button should be displayed
        expect(recordButton).toBeFalsy()
        expect(stopButton).toBeTruthy();

        tick(1000);

        //click to stop the recording
        stopButton.click;

      }
    )

    fixture.detectChanges()
    //after clicking stop, the displayed button should be for recording again
    expect(recordButton).toBeTruthy();


    console.log("this is the file input name =====" + fileInput.name.name);

    // console.log("this is the audio " + fileInput.value);
    fixture.whenStable().then(() =>
    {
      expect(component.processRecording).toHaveBeenCalled();
      expect(fileInput.name).toEqual("aujhvjhdio.mp3")
    }
    )


  }));







  // it('clicking on mapbox should display location in preview', fakeAsync(() => {
  //
  //
  //   const locationPreview = fixture.debugElement.query(By.css('#card-location'));
  //
  //   const mapbox = fixture.debugElement.query(By.css('#map-mapbox'));
  //
  //
  //   expect(locationPreview.nativeElement.textContent.trim()).toBe("");
  //
  //   expect(mapbox).toBeTruthy();
  //
  //   mapbox.nativeElement.click
  //
  //   fixture.detectChanges();
  //
  //
  //   console.log("this is the location ------>>>" + component.newPost.location)
  //
  //
  //   fixture.whenStable().then(() => {
  //     console.log("this is the location ------>>>" + component.newPost.location)
  //     expect(locationPreview.nativeElement.textContent.trim()).toContain('----')
  //
  //   });
  //
  //
  //
  // }));


});
