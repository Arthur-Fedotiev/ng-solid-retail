import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedUiMaterialModule } from '@sr/shared/ui-material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CreateProductComponent } from './create-product.component';
import { ProductsFacadeService } from '@sr/products/data-access';
import { Subject, BehaviorSubject } from 'rxjs';

describe('CreateProductComponent', () => {
  const categoriesSubj = new Subject();
  const retailersSubj = new BehaviorSubject([]);

  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let productFacadeMock: jest.Mocked<ProductsFacadeService>;

  beforeEach(async () => {
    const productFacade = {
      createProduct: jest.fn(),
      categories$: categoriesSubj,
      retailers$: retailersSubj,
    };
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NoopAnimationsModule,
        SharedUiMaterialModule,
        HttpClientModule,
        ReactiveFormsModule,
      ],
      declarations: [CreateProductComponent],
      providers: [
        {
          provide: ProductsFacadeService,
          useValue: productFacade,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProductComponent);
    productFacadeMock =
      productFacade as unknown as jest.Mocked<ProductsFacadeService>;
    component = fixture.componentInstance;
  });

  beforeEach(() => fixture.detectChanges());

  afterEach(() => jest.clearAllMocks());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form group', () => {
    it('should create form group with initial values', () => {
      const expectedInitialFormGroupValue = {
        name: '',
        description: '',
        sku: '',
        url: '',
        categories: [{ name: '', id: '' }],
        prices: [{ tier: 1, price: 0, retailer: [null] }],
      };

      expect(component.productForm.value).toEqual(
        expect.objectContaining({
          ...expectedInitialFormGroupValue,
          prices: expect.arrayContaining([
            {
              ...expectedInitialFormGroupValue.prices[0],
              retailer: expectedInitialFormGroupValue.prices[0].retailer[0],
            },
          ]),
        })
      );
    });

    it('should add price', () => {
      component.addPrice();
      component.addPrice();

      expect(component.prices.length).toBe(3);
    });

    it('should delete price', () => {
      component.addPrice();
      component.addPrice();
      component.addPrice();

      component.deletePrice(1);

      expect(component.prices.length).toBe(3);
    });
  });

  describe('onSave', () => {
    it('should delegate to facade to create product', fakeAsync(() => {
      const createProductSpy = jest.spyOn(productFacadeMock, 'createProduct');
      const expectedProduct = {
        name: '',
        description: '',
        sku: '',
        url: '',
        categories: [{ name: '', id: '' }],
        prices: [{ tier: 1, price: 0, retailer: { name: '', id: '' } }],
      };
      component.productForm.setValue(expectedProduct);

      component.onSave();

      expect(createProductSpy).toHaveBeenCalledWith(expectedProduct);
    }));
  });

  describe('#load', () => {
    it('should get categories', fakeAsync(() => {
      const categoriesStub = [
        { id: '1', name: 'Category 1' },
        { id: '2', name: 'Category 2' },
      ];

      categoriesSubj.next(categoriesStub);

      tick();

      component.categories$.subscribe((c) => {
        expect(c).toEqual(categoriesStub);
      });

      tick();
    }));
  });
});
