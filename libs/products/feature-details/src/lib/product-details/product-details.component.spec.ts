import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  CategoryEnum,
  makeProductViewModelsStub,
  PriceViewModel,
  ProductsFacadeService,
} from '@sr/products/data-access';
import { CompetitorsDialogComponent } from '@sr/products/ui';
import { of, Subject } from 'rxjs';

import { ProductDetailsComponent } from './product-details.component';

describe('ProductDetailsComponent', () => {
  const productsSelectorStub$ = new Subject();

  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let facadeMock: jest.Mocked<ProductsFacadeService>;
  let dialogMock: jest.Mocked<MatDialog>;

  beforeEach(async () => {
    dialogMock = {
      open: jest.fn(),
    } as unknown as jest.Mocked<MatDialog>;
    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent],
      providers: [
        {
          provide: ProductsFacadeService,
          useValue: {
            selectedProduct$: productsSelectorStub$,
            releaseSelectedProduct: jest.fn(),
            selectedProductUpdate: jest.fn(),
            getCompetitorsForCategory$: jest.fn(),
          },
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

      expect(facadeMock.selectedProductUpdate).toHaveBeenNthCalledWith(
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

      facadeMock.getCompetitorsForCategory$.mockReturnValue(competitorsStub$);

      console.log(dialogMock === component['dialog']);

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
