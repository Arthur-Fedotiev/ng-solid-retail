import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  ControlContainer,
  ReactiveFormsModule,
  NonNullableFormBuilder,
  FormArray,
  Validators,
  FormGroup,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { OnInit } from '@angular/core';
import { PriceFormGroup, PricesFormVM } from './models';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'sr-prices-form',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  ],

  template: `
    <div [formGroup]="$any(controlContainer.control)">
      <ng-container [formArrayName]="name">
        <ng-container *ngFor="let _ of priceFormArray.controls; index as i">
          <div
            class="tw-flex tw-flex-col md:tw-gap-4 md:tw-flex-row md:tw-flex-nowrap md:tw-justify-between md:tw-items-baseline"
            [formGroupName]="i"
          >
            <mat-form-field appearance="outline">
              <mat-label>Price</mat-label>
              <input
                matInput
                type="number"
                formControlName="value"
                placeholder="Product Price"
              />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Retailer</mat-label>
              <mat-select formControlName="tier" placeholder="Product Tier">
                <mat-option
                  *ngFor="let tier of vm.tiers"
                  [value]="tier.value"
                  >{{ tier.label }}</mat-option
                >
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Retailer</mat-label>
              <mat-select
                formControlName="retailer"
                placeholder="Product Retailer"
              >
                <mat-option
                  *ngFor="let retailer of vm.retailers"
                  [value]="retailer.value"
                  >{{ retailer.label }}</mat-option
                >
              </mat-select>
            </mat-form-field>
            <button
              class="md:tw-hidden"
              mat-raised-button
              color="warn"
              (click)="deletePrice(i)"
            >
              DELETE PRICE
            </button>
            <button
              class="tw-hidden md:tw-block"
              color="warn"
              mat-mini-fab
              (click)="deletePrice(i)"
            >
              <mat-icon class="delete-btn">delete_forever</mat-icon>
            </button>
          </div>
        </ng-container>
      </ng-container>
      <button
        mat-raised-button
        class="tw-mt-4"
        type="button"
        color="accent"
        (click)="addPrice()"
      >
        ADD PRICE
      </button>
    </div>
  `,
  styleUrls: ['./prices-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricesFormComponent implements OnInit {
  @Input({ required: true }) vm!: PricesFormVM;
  @Input({ required: true }) name!: string;

  private readonly fb = inject(NonNullableFormBuilder);

  protected priceFormArray!: FormArray;

  protected readonly controlContainer = inject(ControlContainer, {
    skipSelf: true,
    host: true,
  });

  ngOnInit(): void {
    this.priceFormArray = (this.controlContainer.control as FormGroup).get(
      this.name
    ) as FormArray<typeof this.priceFormGroup>;

    this.addPrice();
  }

  addPrice() {
    this.priceFormArray.push(this.priceFormGroup);
  }

  deletePrice(idx: number) {
    this.priceFormArray.removeAt(idx);
  }

  private get priceFormGroup() {
    return this.fb.group({
      tier: [
        'FirstTier',
        [Validators.required, Validators.min(1), Validators.max(3)],
      ],
      retailer: [
        null as unknown as PriceFormGroup['controls']['retailer']['value'],
        Validators.required,
      ],
      value: [0, [Validators.required, Validators.min(1)]],
    });
  }
}
