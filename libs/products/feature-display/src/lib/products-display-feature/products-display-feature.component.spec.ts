import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsFacadeService } from '@sr/products/application';

import { Subject } from 'rxjs';

import { ProductsDisplayFeatureComponent } from './products-display-feature.component';
import { Router } from '@angular/router';

describe('ProductsDisplayFeatureComponent', () => {
  const productsSelectorStub$ = new Subject();

  let component: ProductsDisplayFeatureComponent;
  let fixture: ComponentFixture<ProductsDisplayFeatureComponent>;
  let facadeService: jest.Mocked<ProductsFacadeService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsDisplayFeatureComponent],
      providers: [
        {
          provide: ProductsFacadeService,
          useValue: {
            productsShortInfo$: productsSelectorStub$,
            productSelected: jest.fn(),
          },
        },
        {
          provide: Router,
          useValue: { getCurrentNavigation: jest.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsDisplayFeatureComponent);
    facadeService = TestBed.inject(
      ProductsFacadeService
    ) as jest.Mocked<ProductsFacadeService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onClick', () => {
    it('should delegate select product on click', () => {
      const productId = 'product-id';

      component.onClick(productId);

      expect(facadeService.productSelected).toHaveBeenNthCalledWith(
        1,
        productId
      );
    });
  });
});
