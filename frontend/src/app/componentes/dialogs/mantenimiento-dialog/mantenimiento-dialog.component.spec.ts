import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoDialogComponent } from './mantenimiento-dialog.component';

describe('MantenimientoDialogComponent', () => {
  let component: MantenimientoDialogComponent;
  let fixture: ComponentFixture<MantenimientoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
