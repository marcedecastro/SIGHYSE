import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolDatosComponent } from './rol-datos.component';

describe('RolDatosComponent', () => {
  let component: RolDatosComponent;
  let fixture: ComponentFixture<RolDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
