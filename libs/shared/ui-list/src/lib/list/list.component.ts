import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Inject,
  Input,
  TemplateRef,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TRACK_BY_ID_OR_IDX, TrackByIdOrIdx } from '@sr/shared/util';

@Component({
  selector: 'sr-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [CommonModule, FlexLayoutModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() items!: ReadonlyArray<unknown> | null;

  @ContentChild('omniaListItem')
  itemTemplate!: TemplateRef<unknown>;

  constructor(
    @Inject(TRACK_BY_ID_OR_IDX) public readonly trackById: TrackByIdOrIdx
  ) {}
}
