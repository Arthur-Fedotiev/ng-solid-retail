import { Pipe, PipeTransform, inject } from '@angular/core';
import { Category, SpecificationsDataService } from '@sr/products/application';

@Pipe({
  name: 'srProductColor',
  standalone: true,
})
export class ProductColorPipe implements PipeTransform {
  private readonly specificationsService = inject(SpecificationsDataService);

  transform(category: Category) {
    return this.specificationsService.getColors(category);
  }
}
