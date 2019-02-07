import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasAbmComponent } from './personas-abm.component';

describe('PersonasAbmComponent', () => {
  let component: PersonasAbmComponent;
  let fixture: ComponentFixture<PersonasAbmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasAbmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
