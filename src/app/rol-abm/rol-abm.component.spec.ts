import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolAbmComponent } from './rol-abm.component';

describe('RolAbmComponent', () => {
  let component: RolAbmComponent;
  let fixture: ComponentFixture<RolAbmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolAbmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
