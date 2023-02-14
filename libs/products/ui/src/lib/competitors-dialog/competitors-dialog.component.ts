import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TRACK_BY_ID_OR_IDX, TrackByIdOrIdx } from '@sr/shared/util';
import { Observable } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { NgIf, AsyncPipe, NgFor } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface CompetitorsDialogData {
  category: { name: string };
  retailers$: Observable<{ name: string; id: string }[]>;
}

@Component({
  selector: 'sr-competitors-dialog',
  styleUrls: ['./competitors-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatDialogModule,
    MatListModule,
    NgIf,
    NgFor,
    MatProgressSpinnerModule,
    AsyncPipe,
  ],
  template: `
    <h1 mat-dialog-title>Competitors for {{ data.category.name }}</h1>
    <div mat-dialog-content>
      <ng-container *ngIf="data.retailers$ | async as competitors; else loading"
        ><mat-list>
          <mat-list-item
            *ngFor="let competitor of competitors; trackBy: trackById"
          >
            <li>{{ competitor.name }}</li>
          </mat-list-item>
        </mat-list></ng-container
      >
    </div>

    <ng-template #loading>
      <mat-progress-spinner
        mode="determinate"
        [value]="75"
        color="primary"
      ></mat-progress-spinner>
    </ng-template>
  `,
})
export class CompetitorsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CompetitorsDialogData,
    @Inject(TRACK_BY_ID_OR_IDX) public readonly trackById: TrackByIdOrIdx
  ) {}
}
