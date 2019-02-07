import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmListaComponent } from './abm-lista.component';

describe('AbmListaComponent', () => {
  let component: AbmListaComponent;
  let fixture: ComponentFixture<AbmListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
