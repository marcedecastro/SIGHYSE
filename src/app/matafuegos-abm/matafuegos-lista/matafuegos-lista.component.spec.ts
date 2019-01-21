import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatafuegosListaComponent } from './matafuegos-lista.component';

describe('MatafuegosListaComponent', () => {
  let component: MatafuegosListaComponent;
  let fixture: ComponentFixture<MatafuegosListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatafuegosListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatafuegosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
