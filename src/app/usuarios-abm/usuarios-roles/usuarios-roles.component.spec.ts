import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosRolesComponent } from './usuarios-roles.component';

describe('UsuariosRolesComponent', () => {
  let component: UsuariosRolesComponent;
  let fixture: ComponentFixture<UsuariosRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
