import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAudioComponent } from './single-audio.component';

describe('SingleAudioComponent', () => {
  let component: SingleAudioComponent;
  let fixture: ComponentFixture<SingleAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleAudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
