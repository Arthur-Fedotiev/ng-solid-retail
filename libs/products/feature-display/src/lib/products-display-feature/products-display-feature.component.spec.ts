import { TestBed } from '@angular/core/testing';
import { SELECT_PRODUCT_COMMAND } from '@sr/products/application';
import { render } from '@testing-library/angular';
import { BehaviorSubject } from 'rxjs';

import { ProductsDisplayFeatureComponent } from './products-display-feature.component';
import { ActivatedRoute } from '@angular/router';
import { ProductCardHarness } from '@sr/products/ui';
import { RESOLVED_VM } from '@sr/shared/util';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('ProductsDisplayFeatureComponent', () => {
  describe('render', () => {
    it('should render products', async () => {
      const { productsShortInfo, productCardHarness } = await setup();

      expect(productCardHarness.length).toEqual(productsShortInfo.length);
    });
  });

  describe('when product selected', () => {
    it('should delegate select product on click', async () => {
      const { selectProductCommandSpy, productsShortInfo, productCardHarness } =
        await setup();
      const productId = productsShortInfo[0].id;

      await productCardHarness[0].click();

      expect(selectProductCommandSpy.execute).toHaveBeenNthCalledWith(
        1,
        productId
      );
    });
  });

  async function setup({ productsShortInfo = createProductsStub() } = {}) {
    const productsSelectorStub$ = new BehaviorSubject({ productsShortInfo });

    const renderResult = await render(ProductsDisplayFeatureComponent, {
      imports: [ProductsDisplayFeatureComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                vm$: productsSelectorStub$,
              },
            },
          },
        },
        {
          provide: SELECT_PRODUCT_COMMAND,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    });

    const loader = TestbedHarnessEnvironment.loader(renderResult.fixture);
    const productCardHarness = await loader.getAllHarnesses(ProductCardHarness);

    return {
      renderResult,
      productsShortInfo,
      productCardHarness,
      selectProductCommandSpy: TestBed.inject(SELECT_PRODUCT_COMMAND),
      vm$: TestBed.inject(ActivatedRoute).snapshot.data[RESOLVED_VM],
    };
  }

  function createProductsStub() {
    return Array.from({ length: 3 }, (_, idx) => createProductStub(idx));
  }

  function createProductStub(idx: number) {
    return {
      id: `product-id-${idx}`,
      name: `product-name-${idx}`,
      sku: `product-sku-${idx}`,
      url: `product-url-${idx}`,
      price: idx,
      retailer: `product-retailer-${idx}`,
    };
  }
});
