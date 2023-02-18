import { TestBed } from '@angular/core/testing';
import { SELECT_PRODUCT_COMMAND } from '@sr/products/application';
import { render } from '@testing-library/angular';
import { BehaviorSubject } from 'rxjs';

import { ProductsDisplayFeatureComponent } from './products-display-feature.component';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { ProductCardComponent } from '@sr/products/ui';
import { RESOLVED_VM } from '@sr/shared/util';
import { DebugElement } from '@angular/core';

describe('ProductsDisplayFeatureComponent', () => {
  describe('render', () => {
    it('should render products', async () => {
      const { renderResult, productsShortInfo } = await setup();

      const productCards = getProductCards(renderResult.debugElement);

      expect(productCards.length).toEqual(productsShortInfo.length);
    });
  });
  describe('when product selected', () => {
    it('should delegate select product on click', async () => {
      const { renderResult, selectProductCommandSpy, productsShortInfo } =
        await setup();
      const productId = productsShortInfo[0].id;

      getFirstProductCard(renderResult.debugElement).triggerEventHandler(
        'click',
        { productId }
      );

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

    return {
      renderResult,
      productsShortInfo,
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

  function getFirstProductCard(debugEl: DebugElement) {
    return debugEl.query(By.directive(ProductCardComponent));
  }

  function getProductCards(debugEl: DebugElement) {
    return debugEl.queryAll(By.directive(ProductCardComponent));
  }
});
