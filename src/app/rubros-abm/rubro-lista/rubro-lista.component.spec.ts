import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubroListaComponent } from './rubro-lista.component';

describe('RubroListaComponent', () => {
  let component: RubroListaComponent;
  let fixture: ComponentFixture<RubroListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubroListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubroListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
