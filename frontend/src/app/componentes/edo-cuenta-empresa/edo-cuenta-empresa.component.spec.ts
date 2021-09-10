import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdoCuentaEmpresaComponent } from './edo-cuenta-empresa.component';

describe('EdoCuentaEmpresaComponent', () => {
  let component: EdoCuentaEmpresaComponent;
  let fixture: ComponentFixture<EdoCuentaEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdoCuentaEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdoCuentaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
