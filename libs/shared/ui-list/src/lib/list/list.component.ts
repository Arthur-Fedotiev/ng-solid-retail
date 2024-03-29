import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
  inject,
} from '@angular/core';
import { TRACK_BY_ID_OR_IDX, WithId } from '@sr/shared/util';
import { ListItemDirective } from '../list-item/list-item.directive';

@Component({
  selector: 'sr-list',
  standalone: true,
  imports: [NgFor, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div
    class="tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-gap-8 tw-sm:gap-1"
  >
    <div
      *ngFor="let item of items; trackBy: trackById"
      class="tw-w-11/12 sm:tw-w-3/4 md:tw-w-1/3 xl:tw-w-1/5"
    >
      <ng-container
        *ngTemplateOutlet="
          listItem?.template ?? itemTemplate ?? defaultTpl;
          context: { $implicit: item }
        "
      ></ng-container>
    </div>

    <ng-template #defaultTpl let-item>
      {{ item.toString() }}
    </ng-template>
  </div>`,
})
export class ListComponent<T extends WithId<unknown>> {
  @Input() items: ReadonlyArray<T> = [];

  @ContentChild('listItem')
  protected readonly itemTemplate: TemplateRef<T> | null = null;

  @ContentChild(ListItemDirective)
  protected readonly listItem: ListItemDirective<T> | null = null;

  protected readonly trackById = inject(TRACK_BY_ID_OR_IDX);
}
