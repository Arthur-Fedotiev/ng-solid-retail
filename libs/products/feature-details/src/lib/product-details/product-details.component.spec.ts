import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsFacadeService } from '@omnia/products/data-access';
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#product$', () => {
    it('should use product selector to get the product', () => {
      expect(component.product$).toBe(facadeMock.selectedProduct$);
    });
  });
});
