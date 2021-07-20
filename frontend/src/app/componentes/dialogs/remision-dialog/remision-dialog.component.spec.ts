import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemisionDialogComponent } from './remision-dialog.component';

describe('RemisionDialogComponent', () => {
  let component: RemisionDialogComponent;
  let fixture: ComponentFixture<RemisionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemisionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemisionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
