import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubrosAbmComponent } from './rubros-abm.component';

describe('RubrosAbmComponent', () => {
  let component: RubrosAbmComponent;
  let fixture: ComponentFixture<RubrosAbmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubrosAbmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubrosAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
