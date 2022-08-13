import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryViewModel } from '@omnia/products/data-access';
import { WithId } from '@omnia/shared/util';

@Component({
  selector: 'omnia-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
})
export class ProductCategoriesComponent {
  @Input() categories!: readonly CategoryViewModel[];
  @Output() categorySelected = new EventEmitter<CategoryViewModel>();

  public trackById(index: number, item: WithId<unknown>): string {
    return item.id ?? index;
  }

  public onCategorySelected(category: CategoryViewModel): void {
    this.categorySelected.emit(category);
  }
}
