import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PriceViewModel, TierViewModel } from '@sr/products/application';
import { map, startWith } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  DatePipe,
  NgIf,
  AsyncPipe,
  NgTemplateOutlet,
  NgFor,
} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PRODUCT_TIERS } from '../shared/constants';
import { MatSelectModule } from '@angular/material/select';

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
    NgFor,
    AsyncPipe,
    MatButtonModule,
    DatePipe,
    MatIconModule,
    NgTemplateOutlet,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class ProductPriceComponent implements OnInit {
  @Input() public price!: PriceViewModel;
  @Input() public isEditMode = false;

  @Output() protected save = new EventEmitter<PriceViewModel>();
  @Output() protected discard = new EventEmitter<PriceViewModel>();

  public readonly priceForm = this.formBuilder.group<{
    value: null | number;
    tier: TierViewModel;
  }>({
    value: null,
    tier: 'FirstTier',
  });

  public readonly isSaveDisabled$ = this.priceForm.valueChanges.pipe(
    map(
      ({ value, tier }) =>
        this.isChanged(value, 'value') || this.isChanged(tier, 'tier')
    ),
    startWith(true)
  );

  protected readonly tiers = Object.values(PRODUCT_TIERS);

  constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.priceForm.setValue({ value: this.price.value, tier: this.price.tier });
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
    this.priceForm.reset({ value: this.price.value, tier: this.price.tier });
  }

  private isChanged(
    val: number | TierViewModel | null | undefined,
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
