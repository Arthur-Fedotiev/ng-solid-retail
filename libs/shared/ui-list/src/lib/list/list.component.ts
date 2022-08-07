import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';

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

  public trackById(index: number, item: any): string | number {
    return item && 'id' in item ? item.id : index;
  }
}
