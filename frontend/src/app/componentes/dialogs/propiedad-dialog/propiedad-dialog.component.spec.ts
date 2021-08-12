import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadDialogComponent } from './propiedad-dialog.component';

describe('PropiedadDialogComponent', () => {
  let component: PropiedadDialogComponent;
  let fixture: ComponentFixture<PropiedadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropiedadDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiedadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
