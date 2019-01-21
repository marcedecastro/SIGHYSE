import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionDatosComponent } from './region-datos.component';

describe('RegionDatosComponent', () => {
  let component: RegionDatosComponent;
  let fixture: ComponentFixture<RegionDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
