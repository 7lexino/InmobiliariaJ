import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MttoIndividualDialogComponent } from './mtto-individual-dialog.component';

describe('MttoIndividualDialogComponent', () => {
  let component: MttoIndividualDialogComponent;
  let fixture: ComponentFixture<MttoIndividualDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MttoIndividualDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MttoIndividualDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
