import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecDoneComponent } from './rec-done.component';

describe('RecDoneComponent', () => {
  let component: RecDoneComponent;
  let fixture: ComponentFixture<RecDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecDoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
