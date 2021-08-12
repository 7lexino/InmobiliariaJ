import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdoCuentaDialogComponent } from './edo-cuenta-dialog.component';

describe('EdoCuentaDialogComponent', () => {
  let component: EdoCuentaDialogComponent;
  let fixture: ComponentFixture<EdoCuentaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdoCuentaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdoCuentaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
