import { CommonModule } from '@angular/common';
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
import { CategoryEnum } from '@sr/products/data-access';
import { BehaviorSubject } from 'rxjs';
import { CREATE_PRODUCT_VM_QUERY } from './cqrs/queries/create-product-vm.query';
import { CREATE_PRODUCT_COMMAND } from './cqrs/commands/create-product.command';
import { LetModule } from '@ngrx/component';
import { CreateProductVM } from './models/view-model';

describe(CreateProductComponent.name, () => {
  const vmMock$ = new BehaviorSubject<CreateProductVM>({
    retailers: [],
    categories: [],
  });

  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let createProduceCommandSpy: jest.Mock;

  beforeEach(async () => {
    createProduceCommandSpy = jest.fn();

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NoopAnimationsModule,
        SharedUiMaterialModule,
        ReactiveFormsModule,
        LetModule,
      ],
      declarations: [CreateProductComponent],
      providers: [
        {
          provide: CREATE_PRODUCT_VM_QUERY,
          useValue: { get: () => vmMock$ },
        },
        {
          provide: CREATE_PRODUCT_COMMAND,
          useValue: {
            execute: createProduceCommandSpy,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProductComponent);
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

      expect(createProduceCommandSpy).toHaveBeenCalledWith(expectedProduct);
    }));
  });

  describe('#load', () => {
    it('should get categories', fakeAsync(() => {
      const categoriesStub = [
        { id: '1', name: CategoryEnum.Books },
        { id: '2', name: CategoryEnum.Brandy },
      ];

      vmMock$.next({
        ...vmMock$.getValue(),
        categories: categoriesStub,
      });

      tick();

      component.vm$.subscribe((result) => {
        expect(result.categories).toEqual(categoriesStub);
      });

      tick();
    }));
  });
});
