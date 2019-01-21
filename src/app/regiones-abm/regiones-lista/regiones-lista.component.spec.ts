import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionesListaComponent } from './regiones-lista.component';

describe('RegionesListaComponent', () => {
  let component: RegionesListaComponent;
  let fixture: ComponentFixture<RegionesListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionesListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
