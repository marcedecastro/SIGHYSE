import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionesAbmComponent } from './regiones-abm.component';

describe('RegionesAbmComponent', () => {
  let component: RegionesAbmComponent;
  let fixture: ComponentFixture<RegionesAbmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionesAbmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionesAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
