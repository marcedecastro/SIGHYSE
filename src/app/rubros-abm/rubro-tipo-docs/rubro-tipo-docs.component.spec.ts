import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubroTipoDocsComponent } from './rubro-tipo-docs.component';

describe('RubroTipoDocsComponent', () => {
  let component: RubroTipoDocsComponent;
  let fixture: ComponentFixture<RubroTipoDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubroTipoDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubroTipoDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
