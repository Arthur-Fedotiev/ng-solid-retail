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
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [CommonModule, FlexLayoutModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div
    class="list"
    fxLayout="row wrap"
    fxLayoutGap.gt-sm="2rem"
    fxLayoutAlign="center center"
  >
    <div
      *ngFor="let item of items; trackBy: $any(trackById)"
      class="list__item"
      fxFlex="90%"
      fxFlex.gt-xs="75%"
      fxFlex.gt-sm="30%"
      fxFlex.gt-md="20%"
      fxFlex.gt-lg="15%"
    >
      <ng-container
        *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"
      ></ng-container>
    </div>
  </div>`,
})
export class ListComponent {
  @Input() items!: ReadonlyArray<unknown> | null;

  @ContentChild('listItem')
  itemTemplate!: TemplateRef<unknown>;

  constructor(
    @Inject(TRACK_BY_ID_OR_IDX) public readonly trackById: TrackByIdOrIdx
  ) {}
}
