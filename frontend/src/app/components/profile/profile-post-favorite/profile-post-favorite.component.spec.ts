import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostFavoriteComponent} from "./profile-post-favorite.component";

describe('ProfilePostComponent', () => {
  let component: ProfilePostFavoriteComponent;
  let fixture: ComponentFixture<ProfilePostFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePostFavoriteComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePostFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
