import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginFormComponent } from './user-login-form.component';

describe('UserLoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<UserLoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoginFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});