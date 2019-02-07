import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmFormComponent } from './abm-form.component';

describe('AbmFormComponent', () => {
  let component: AbmFormComponent;
  let fixture: ComponentFixture<AbmFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
