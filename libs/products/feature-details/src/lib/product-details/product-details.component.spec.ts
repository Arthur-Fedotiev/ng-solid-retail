import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  CategoryEnum,
  makeProductViewModelsStub,
  PriceViewModel,
  ProductsFacadeService,
} from '@sr/products/application';
import { CompetitorsDialogComponent } from '@sr/products/ui';
import { of, Subject, BehaviorSubject } from 'rxjs';

import { ProductDetailsComponent } from './product-details.component';
import {
  PRODUCT_DETAILS_COMMANDS_API,
  ProductDetailsCommandsApi,
} from './cqrs/product.details-api.commands';
import { COMPETITORS_QUERY, CompetitorsQuery } from './cqrs/categories.query';
import {
  PRODUCT_DETAIL_VM_QUERY,
  ProductDetailsVM,
} from './cqrs/product-details-vm.query';

describe('ProductDetailsComponent', () => {
  const productsSelectorStub$ = new BehaviorSubject({
    product: makeProductViewModelsStub()[0],
  });

  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let dialogMock: jest.Mocked<MatDialog>;
  let productDetailsCommandsAPIStub: jest.Mocked<ProductDetailsCommandsApi>;
  let competitorsQueryStub: jest.Mocked<CompetitorsQuery>;
  let productDetailVMQueryStub: jest.Mocked<ProductDetailsVM>;

  beforeEach(async () => {
    dialogMock = {
      open: jest.fn(),
    } as unknown as jest.Mocked<MatDialog>;
    productDetailsCommandsAPIStub = {
      update: jest.fn(),
      delete: jest.fn(),
      releaseResources: jest.fn(),
    };
    competitorsQueryStub = {
      get: jest.fn(),
    };
    productDetailVMQueryStub = {
      get: jest.fn().mockReturnValue(productsSelectorStub$),
    };

    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent],
      providers: [
        {
          provide: PRODUCT_DETAILS_COMMANDS_API,
          useValue: productDetailsCommandsAPIStub,
        },
        {
          provide: COMPETITORS_QUERY,
          useValue: competitorsQueryStub,
        },
        {
          provide: PRODUCT_DETAIL_VM_QUERY,
          useValue: productDetailVMQueryStub,
        },
      ],
    })
      .overrideComponent(ProductDetailsComponent, {
        remove: {
          imports: [MatDialogModule],
        },
        add: {
          providers: [
            {
              provide: MatDialog,
              useValue: dialogMock,
            },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => jest.clearAllMocks());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#product$', () => {
    it('should use product selector to get the product', () => {
      expect(component.vm$).toBe(productDetailVMQueryStub.get());
    });
  });

  describe('#ngOnDestroy', () => {
    it('should call releaseResources', () => {
      component.ngOnDestroy();

      expect(productDetailsCommandsAPIStub.releaseResources).toHaveBeenCalled();
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

      expect(productDetailsCommandsAPIStub.update).toHaveBeenNthCalledWith(
        1,
        expectedProduct
      );
    });
  });

  describe('#openCompetitorsDialog', () => {
    it('should open the competitors dialog', () => {
      const categoryStub = {
        id: '1',
        name: CategoryEnum.Wine,
      };
      const competitorsStub$ = of([{ id: '1', name: '1' }]);

      competitorsQueryStub.get.mockReturnValue(competitorsStub$);
      component.openCompetitorsDialog(categoryStub);

      expect(dialogMock.open).toHaveBeenCalledWith(
        CompetitorsDialogComponent,
        expect.objectContaining({
          width: '500px',
          data: expect.objectContaining({
            category: categoryStub,
            retailers$: competitorsStub$,
          }),
        })
      );
    });
  });
});
