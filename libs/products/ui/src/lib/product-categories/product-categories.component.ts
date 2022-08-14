import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { TrackByIdOrIdx, TRACK_BY_ID_OR_IDX } from '@omnia/shared/util';

@Component({
  selector: 'omnia-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
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
