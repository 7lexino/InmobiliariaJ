import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaveRegistroDialogComponent } from './clave-registro-dialog.component';

describe('ClaveRegistroDialogComponent', () => {
  let component: ClaveRegistroDialogComponent;
  let fixture: ComponentFixture<ClaveRegistroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaveRegistroDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaveRegistroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
