import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Inject,
  Input,
  TemplateRef,
} from '@angular/core';
import { TRACK_BY_ID_OR_IDX, TrackByIdOrIdx } from '@omnia/shared/util';

@Component({
  selector: 'omnia-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
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
