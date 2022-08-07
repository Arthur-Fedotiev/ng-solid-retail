import { CommonModule } from '@angular/common';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { SharedUiMaterialModule } from '@omnia/shared/ui-material';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  const productShortInfoStub = {
    id: '1',
    price: 1,
    name: 'Product 1',
    sku: 'SKU 1',
    retailer: 'Retailer 1',
  };

  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
      imports: [SharedUiMaterialModule, CommonModule],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    component.product = productShortInfoStub;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive the product from the parent component', () => {
    expect(component.product).toEqual(productShortInfoStub);
  });

  it('should render the product ', () => {
    expect(fixture).toMatchSnapshot();
  });
});
