import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubroDatosComponent } from './rubro-datos.component';

describe('RubroDatosComponent', () => {
  let component: RubroDatosComponent;
  let fixture: ComponentFixture<RubroDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubroDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubroDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
