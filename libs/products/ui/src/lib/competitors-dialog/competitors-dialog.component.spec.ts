import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorsDialogComponent } from './competitors-dialog.component';

describe('CompetitorsDialogComponent', () => {
  let component: CompetitorsDialogComponent;
  let fixture: ComponentFixture<CompetitorsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompetitorsDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompetitorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
