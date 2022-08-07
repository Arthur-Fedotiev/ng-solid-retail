import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ProductsFacadeService } from '@omnia/products/data-access';
import { makeProductsStub } from '@omnia/products/infrastructure';
import { SharedUiListModule } from '@omnia/shared/ui-list';
import { toProductViewModel } from '@omnia/products/data-access';
import { BehaviorSubject, Subject } from 'rxjs';

import { ProductsListComponent } from './products-list.component';

describe('ProductsListComponent', () => {
  const productsSelectorStub$ = new Subject();

  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let facadeService: jest.Mocked<ProductsFacadeService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      imports: [SharedUiListModule],
      providers: [
        {
          provide: ProductsFacadeService,
          useValue: {
            products$: productsSelectorStub$,
            loadProducts: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    facadeService = TestBed.inject(
      ProductsFacadeService
    ) as jest.Mocked<ProductsFacadeService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#loadProducts', () => {
    it('should delegate load products on init', () => {
      expect(facadeService.loadProducts).toHaveBeenCalledTimes(1);
    });

    it('should load products when initialized', fakeAsync(() => {
      const productsStub = makeProductsStub(3);
      const expected = productsStub.map(toProductViewModel);

      tick();

      component.products$.subscribe((products) => {
        expect(products).toEqual(expected);
      });

      tick();
    }));
  });
});
