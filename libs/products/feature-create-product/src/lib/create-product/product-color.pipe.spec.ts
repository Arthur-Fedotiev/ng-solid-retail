import { ProductColorPipe } from './product-color.pipe';
import { TestBed } from '@angular/core/testing';
import { SpecificationsDataService } from '@sr/products/application';
import { CategoryEnum } from '@sr/products/application';

describe('ProductColorPipe', () => {
  it('should delegate to SpecificationsDataService', () => {
    TestBed.overrideProvider(SpecificationsDataService, {
      useValue: { getColors: jest.fn() },
    });

    TestBed.runInInjectionContext(() => {
      const pipe = new ProductColorPipe();

      pipe.transform(CategoryEnum.Shoes);

      expect(
        TestBed.inject(SpecificationsDataService).getColors
      ).toHaveBeenCalledWith(CategoryEnum.Shoes);
    });
  });
});
