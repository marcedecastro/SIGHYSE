import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatafuegosDatosComponent } from './matafuegos-datos.component';

describe('MatafuegosDatosComponent', () => {
  let component: MatafuegosDatosComponent;
  let fixture: ComponentFixture<MatafuegosDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatafuegosDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatafuegosDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
