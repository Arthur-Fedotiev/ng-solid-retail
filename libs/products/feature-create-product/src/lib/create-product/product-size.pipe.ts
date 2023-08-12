import { Pipe, PipeTransform, inject } from '@angular/core';
import { Category, SpecificationsDataService } from '@sr/products/application';

@Pipe({
  name: 'srProductSize',
  standalone: true,
})
export class ProductSizePipe implements PipeTransform {
  private readonly specificationsService = inject(SpecificationsDataService);

  transform(category: Category) {
    return this.specificationsService.getSizes(category);
  }
}
