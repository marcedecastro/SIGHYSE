import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosDatosComponent } from './usuarios-datos.component';

describe('UsuariosDatosComponent', () => {
  let component: UsuariosDatosComponent;
  let fixture: ComponentFixture<UsuariosDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
