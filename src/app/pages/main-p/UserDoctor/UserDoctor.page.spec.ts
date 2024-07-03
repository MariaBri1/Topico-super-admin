import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDoctorPage } from './UserDoctor.page';

describe('UserDoctorPage', () => {
  let component: UserDoctorPage;
  let fixture: ComponentFixture<UserDoctorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDoctorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
