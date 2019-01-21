import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegajoConsultasComponent } from './legajo-consultas.component';

describe('LegajoConsultasComponent', () => {
  let component: LegajoConsultasComponent;
  let fixture: ComponentFixture<LegajoConsultasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegajoConsultasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegajoConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
