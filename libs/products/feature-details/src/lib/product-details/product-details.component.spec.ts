import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  makeProductViewModelsStub,
  PriceViewModel,
  ProductsFacadeService,
  ProductViewModel,
} from '@omnia/products/data-access';
import { Subject } from 'rxjs';

import { ProductDetailsComponent } from './product-details.component';

describe('ProductDetailsComponent', () => {
  const productsSelectorStub$ = new Subject();

  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let facadeMock: jest.Mocked<ProductsFacadeService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      providers: [
        {
          provide: ProductsFacadeService,
          useValue: {
            selectedProduct$: productsSelectorStub$,
            releaseSelectedProduct: jest.fn(),
            selectedProductPriceUpdate: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    facadeMock = TestBed.inject(
      ProductsFacadeService
    ) as jest.Mocked<ProductsFacadeService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => jest.clearAllMocks());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#product$', () => {
    it('should use product selector to get the product', () => {
      expect(component.product$).toBe(facadeMock.selectedProduct$);
    });
  });

  describe('#ngOnDestroy', () => {
    it('should call releaseSelectedProduct', () => {
      component.ngOnDestroy();

      expect(facadeMock.releaseSelectedProduct).toHaveBeenCalled();
    });
  });

  describe('#update product price', () => {
    it('should update product when product price changes', () => {
      const productStub = makeProductViewModelsStub(1)[0];
      const priceStub = {
        id: productStub.prices[0].id,
        price: 11111,
      } as PriceViewModel;

      component.updateProductPrice(productStub, priceStub);

      const expectedPrices = expect.arrayContaining([
        expect.objectContaining(priceStub),
      ]);
      const expectedProduct = expect.objectContaining({
        prices: expectedPrices,
      });

      expect(facadeMock.selectedProductPriceUpdate).toHaveBeenNthCalledWith(
        1,
        expectedProduct,
        priceStub.id
      );
    });
  });
});
