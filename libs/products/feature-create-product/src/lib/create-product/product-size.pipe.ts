import { Pipe, PipeTransform, inject } from '@angular/core';
import {
  CategoryEnum,
  SpecificationsDataService,
} from '@sr/products/application';

@Pipe({
  name: 'srProductSize',
  standalone: true,
})
export class ProductSizePipe implements PipeTransform {
  private readonly specificationsService = inject(SpecificationsDataService);

  transform(category: CategoryEnum) {
    return this.specificationsService.getSizes(category);
  }
}
