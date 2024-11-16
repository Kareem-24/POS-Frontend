import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPrivillagesComponent } from './user-privillages.component';

describe('UserPrivillagesComponent', () => {
  let component: UserPrivillagesComponent;
  let fixture: ComponentFixture<UserPrivillagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPrivillagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPrivillagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
