import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingPostComponent } from './recording-post.component';

describe('RecordingPostComponent', () => {
  let component: RecordingPostComponent;
  let fixture: ComponentFixture<RecordingPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordingPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordingPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
