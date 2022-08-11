import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedUiMaterialModule } from '@omnia/shared/ui-material';
import { of } from 'rxjs';

import { CompetitorsDialogComponent } from './competitors-dialog.component';

describe('CompetitorsDialogComponent', () => {
  let component: CompetitorsDialogComponent;
  let fixture: ComponentFixture<CompetitorsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUiMaterialModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            category: { id: '1', name: 'Category 1' },
            competitors$: of([{ id: '1', name: 'Competitor 1' }]),
          },
        },
      ],
      declarations: [CompetitorsDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompetitorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the competitors', () => {
    expect(fixture).toMatchSnapshot();
  });
});
