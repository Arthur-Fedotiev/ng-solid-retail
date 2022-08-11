import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

interface CompetitorsDialogData {
  category: { name: string };
  retailers$: Observable<{ name: string; id: string }[]>;
}

@Component({
  selector: 'omnia-competitors-dialog',
  templateUrl: './competitors-dialog.component.html',
  styleUrls: ['./competitors-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetitorsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CompetitorsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompetitorsDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
