import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from '@angular/core';
import { TrackByIdOrIdx, TRACK_BY_ID_OR_IDX } from '@sr/shared/util';
import { MatChipsModule } from '@angular/material/chips';
import { NgFor } from '@angular/common';

@Component({
  selector: 'sr-product-categories',
  styleUrls: ['./product-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatChipsModule, NgFor],
  template: `
    <h3 class="mat-title">Categories</h3>
    <mat-chip-set aria-label="Book categories">
      <mat-chip
        *ngFor="
          let category of categories;
          even as even;
          index as i;
          trackBy: trackById
        "
        class="product-card__category subheading-2"
        matTooltip="Show competitors for category"
        aria-label="Show competitors for category"
        selected
        color="primary"
        (click)="onCategorySelected(category)"
        >{{ category.name }}</mat-chip
      >
    </mat-chip-set>
  `,
})
export class ProductCategoriesComponent<
  T extends readonly { id: string; name: string }[]
> {
  @Input() categories!: T;
  @Output() categorySelected = new EventEmitter<T[number]>();

  constructor(
    @Inject(TRACK_BY_ID_OR_IDX) public readonly trackById: TrackByIdOrIdx
  ) {}

  public onCategorySelected(category: T[number]): void {
    this.categorySelected.emit(category);
  }
}
