import { CommonModule } from '@angular/common';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedUiMaterialModule } from '@omnia/shared/ui-material';
import { take, toArray } from 'rxjs';

import { ProductPriceComponent } from './product-price.component';

describe('ProductPriceComponent', () => {
  const paramsStub = {
    price: { price: 100, tier: 1, retailer: { name: 'Retailer' } },
    isEditMode: false,
    save: { emit: jest.fn() },
    discard: { emit: jest.fn() },
  };
  let component: ProductPriceComponent;
  let fixture: ComponentFixture<ProductPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUiMaterialModule, ReactiveFormsModule, CommonModule],
      declarations: [ProductPriceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPriceComponent);
    component = fixture.componentInstance;

    Object.assign(component, paramsStub);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#form', () => {
    it('should set form with passed input value', () => {
      const expected = {
        price: paramsStub.price.price,
        tier: paramsStub.price.tier,
      };

      expect(component.priceForm.value).toEqual(expected);
    });
  });

  describe('#isSaveDisabled$', () => {
    it('should start with true and emit true if form value is equal to price value', (done) => {
      const expected = [true, false, false];

      component.isSaveDisabled$.pipe(take(3), toArray()).subscribe((value) => {
        expect(value).toEqual(expected);
        done();
      });

      component.priceForm.setValue({ price: 12, tier: 1 });
      component.priceForm.setValue({ price: paramsStub.price.price, tier: 1 });
    });
  });

  describe('#toggleEditMode', () => {
    it('should toggle isEditMode', () => {
      component.isEditMode = false;
      component.toggleEditMode();

      expect(component.isEditMode).toBe(true);
    });
  });

  describe('#savePrice', () => {
    it('should emit save event with updated price', () => {
      const priceStub = { price: 1111, tier: 1 };
      const expected = { ...paramsStub.price, ...priceStub };

      component.priceForm.setValue(priceStub);
      component.savePrice();

      expect(paramsStub.save.emit).toHaveBeenCalledWith(expected);
    });

    it('should toggle isEditMode on next event loop tick', fakeAsync(() => {
      component.isEditMode = true;

      component.savePrice();
      tick();

      expect(component.isEditMode).toBe(false);
    }));
  });

  describe('#discardPrice', () => {
    it('should emit discard event with original price', () => {
      component.discardPrice();

      expect(paramsStub.discard.emit).toHaveBeenCalledTimes(1);
    });

    it('should reset form on discard event', () => {
      component.priceForm.setValue({ price: 1111, tier: 1 });
      component.discardPrice();

      expect(component.priceForm.value).toEqual({
        price: paramsStub.price.price,
        tier: paramsStub.price.tier,
      });
    });

    it('should toggle isEditMode', () => {
      component.isEditMode = true;
      component.discardPrice();

      expect(component.isEditMode).toBe(false);
    });
  });
});
