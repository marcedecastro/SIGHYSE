import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegajoInformeComponent } from './legajo-informe.component';

describe('LegajoInformeComponent', () => {
  let component: LegajoInformeComponent;
  let fixture: ComponentFixture<LegajoInformeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegajoInformeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegajoInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
