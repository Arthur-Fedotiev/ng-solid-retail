import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PriceViewModel } from '@sr/products/data-access';
import { map, startWith } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePipe, NgIf, AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  exportAs: 'omniaProductPrice',
  selector: 'sr-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FlexLayoutModule,
    NgIf,
    AsyncPipe,
    MatButtonModule,
    DatePipe,
    MatIconModule,
    NgTemplateOutlet,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ProductPriceComponent implements OnInit {
  @Input() public price!: PriceViewModel;
  @Input() public isEditMode = false;

  @Output() protected save = new EventEmitter<PriceViewModel>();
  @Output() protected discard = new EventEmitter<PriceViewModel>();

  public readonly priceForm = this.formBuilder.group<{
    price: null | number;
    tier: number;
  }>({
    price: null,
    tier: 1,
  });

  public readonly isSaveDisabled$ = this.priceForm.valueChanges.pipe(
    map(
      ({ price, tier }) =>
        this.isChanged(price, 'price') || this.isChanged(tier, 'tier')
    ),
    startWith(true)
  );

  constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.priceForm.setValue({ price: this.price.price, tier: this.price.tier });
  }

  public toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  public savePrice(): void {
    const updatedPrice = Object.assign(this.price, this.priceForm.value);

    this.save.emit(updatedPrice);
    this.toggleNextTick();
  }

  public discardPrice(): void {
    this.discard.emit();
    this.resetForm();
    this.isEditMode = false;
  }

  private resetForm(): void {
    this.priceForm.reset({ price: this.price.price, tier: this.price.tier });
  }

  private isChanged(
    val: number | null | undefined,
    key: keyof PriceViewModel
  ): boolean {
    return val === this.priceForm.get(key) || val == null;
  }

  private toggleNextTick(): void {
    setTimeout(() => {
      this.isEditMode = false;
    });
  }
}
