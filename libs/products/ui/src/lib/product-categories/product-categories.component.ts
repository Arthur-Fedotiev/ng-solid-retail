import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WithId } from '@omnia/shared/util';

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

  public trackById(index: number, item: WithId<unknown>): string {
    return item.id ?? index;
  }

  public onCategorySelected(category: T[number]): void {
    this.categorySelected.emit(category);
  }
}
