import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PriceViewModel } from '@omnia/products/data-access';
import { map, startWith } from 'rxjs';

interface ProductPrice {
  price: number;
  tier: number;
  retailer: {
    name: string;
  };
}

@Component({
  exportAs: 'omniaProductPrice',
  selector: 'omnia-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPriceComponent implements OnInit {
  @Input() public price!: PriceViewModel;
  @Input() public isEditMode = false;

  @Output() protected save = new EventEmitter<ProductPrice>();
  @Output() protected discard = new EventEmitter<ProductPrice>();

  public readonly priceForm = this.formBuilder.group<{
    price: null | number;
  }>({
    price: null,
  });

  public readonly isSaveDisabled$ = this.priceForm.valueChanges.pipe(
    map(({ price }) => price === this.price.price || price == null),
    startWith(true)
  );

  constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.priceForm.setValue({ price: this.price.price });
  }

  public toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  public savePrice(): void {
    this.save.emit({
      ...this.price,
      price: this.priceForm.value.price as number,
    });
    this.toggleEditMode();
  }

  public discardPrice(): void {
    this.discard.emit(this.price);
    this.resetForm();
    this.toggleEditMode();
  }

  private resetForm(): void {
    this.priceForm.reset({ price: this.price.price });
  }
}
