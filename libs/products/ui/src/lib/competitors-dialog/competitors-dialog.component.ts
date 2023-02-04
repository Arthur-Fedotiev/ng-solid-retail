import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { TRACK_BY_ID_OR_IDX, TrackByIdOrIdx } from '@sr/shared/util';
import { Observable } from 'rxjs';

interface CompetitorsDialogData {
  category: { name: string };
  retailers$: Observable<{ name: string; id: string }[]>;
}

@Component({
  selector: 'sr-competitors-dialog',
  templateUrl: './competitors-dialog.component.html',
  styleUrls: ['./competitors-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetitorsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CompetitorsDialogData,
    @Inject(TRACK_BY_ID_OR_IDX) public readonly trackById: TrackByIdOrIdx
  ) {}
}
