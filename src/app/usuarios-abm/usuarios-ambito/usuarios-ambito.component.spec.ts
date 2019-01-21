import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosAmbitoComponent } from './usuarios-ambito.component';

describe('UsuariosAmbitoComponent', () => {
  let component: UsuariosAmbitoComponent;
  let fixture: ComponentFixture<UsuariosAmbitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosAmbitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosAmbitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
