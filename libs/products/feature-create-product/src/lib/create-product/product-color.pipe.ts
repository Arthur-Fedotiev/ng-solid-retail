import { Pipe, PipeTransform, inject } from '@angular/core';
import {
  CategoryEnum,
  SpecificationsDataService,
} from '@sr/products/application';

@Pipe({
  name: 'srProductColor',
  standalone: true,
})
export class ProductColorPipe implements PipeTransform {
  private readonly specificationsService = inject(SpecificationsDataService);

  transform(category: CategoryEnum) {
    return this.specificationsService.getColors(category);
  }
}
