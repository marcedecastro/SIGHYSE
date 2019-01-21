import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatafuegosAbmComponent } from './matafuegos-abm.component';

describe('MatafuegosAbmComponent', () => {
  let component: MatafuegosAbmComponent;
  let fixture: ComponentFixture<MatafuegosAbmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatafuegosAbmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatafuegosAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
