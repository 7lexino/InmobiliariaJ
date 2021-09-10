import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgresoDialogComponent } from './egreso-dialog.component';

describe('EgresoDialogComponent', () => {
  let component: EgresoDialogComponent;
  let fixture: ComponentFixture<EgresoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgresoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EgresoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
