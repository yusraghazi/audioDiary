import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostComponent} from "./profile-post.component";

describe('ProfilePostComponent', () => {
  let component: ProfilePostComponent;
  let fixture: ComponentFixture<ProfilePostComponent>;
  let h1: HTMLElement;
  let comp: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePostComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display original title', () => {
    // Hooray! No `fixture.detectChanges()` needed
    expect(h1.textContent).toContain(comp.title);
  });
});
