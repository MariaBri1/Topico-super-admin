import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserUsuarioPage } from './UserUsuario.page';

describe('UserUsuarioPage', () => {
  let component: UserUsuarioPage;
  let fixture: ComponentFixture<UserUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
