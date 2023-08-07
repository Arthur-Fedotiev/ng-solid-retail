import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Type,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TRACK_BY_ID_OR_IDX } from '@sr/shared/util';
import { validateSize } from './util/validate-size';
import { CREATE_PRODUCT_COMMAND } from './cqrs/commands/create-product.command';
import { CREATE_PRODUCT_VM_QUERY } from './cqrs/queries/create-product-vm.query';
import { LetModule } from '@ngrx/component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import {
  AsyncPipe,
  JsonPipe,
  NgFor,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgTemplateOutlet,
  CommonModule,
} from '@angular/common';
import {
  CategoryEnum,
  Price,
  SpecificationsDataService,
} from '@sr/products/application';
import { ProductSizePipe } from './product-size.pipe';
import { SpecificationControlDirective } from './specification-control.directive';

import { UntilDestroy } from '@ngneat/until-destroy';

import { ProductColorPipe } from './product-color.pipe';
import { SpecificationsStrategyFactory } from './specifications/specifications-strategy.factory.service';
import { DynamicComponentConfig } from './specifications/strategies';
import { STRATEGY_PROVIDERS } from './specifications/strategy.provider';
import { Observable, EMPTY } from 'rxjs';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PricesFormComponent } from '@sr/products/ui';

@UntilDestroy()
@Component({
  selector: 'sr-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [STRATEGY_PROVIDERS, SpecificationsStrategyFactory],
  imports: [
    JsonPipe,
    NgFor,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    CommonModule,
    NgTemplateOutlet,
    AsyncPipe,
    ProductColorPipe,
    ReactiveFormsModule,
    LetModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    ProductSizePipe,
    SpecificationControlDirective,
    PricesFormComponent,
  ],
})
export class CreateProductComponent {
  private readonly specificationStrategyFactory = inject(
    SpecificationsStrategyFactory
  );
  private readonly createProductCommand = inject(CREATE_PRODUCT_COMMAND);
  private readonly fb = inject(FormBuilder);

  protected readonly Categories = CategoryEnum;
  protected readonly bookCovers = inject(
    SpecificationsDataService
  ).getCoverTypes();

  protected specificationCmp$: Observable<Type<object>> = EMPTY;
  protected specificationInputs?: Record<string, any>;

  public readonly vm$ = inject(CREATE_PRODUCT_VM_QUERY).get();
  public readonly trackById = inject(TRACK_BY_ID_OR_IDX);
  public readonly productForm = this.fb.nonNullable.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(150)],
    ],
    description: ['', [Validators.required, Validators.maxLength(5000)]],
    sku: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    url: ['', [Validators.required, Validators.maxLength(150)]],
    category: [{ name: '' as CategoryEnum, id: '' }, Validators.required],
    specifications: this.fb.group({}),
    prices: this.fb.nonNullable.array<Price>([], [validateSize(1)]),
  });

  public updateSpecifications(category: CategoryEnum) {
    const specificationStrategy =
      this.specificationStrategyFactory.create(category);

    this.productForm.setControl(
      'specifications',
      specificationStrategy.buildFormGroup(this.fb)
    );

    this.setSpecificationComponent(
      specificationStrategy.getDynamicComponentConfig()
    );
  }

  public onSave(): void {
    this.createProductCommand.execute(this.productForm.getRawValue());
  }

  private setSpecificationComponent({
    inputs,
    component,
  }: DynamicComponentConfig): void {
    this.specificationCmp$ = component;
    this.specificationInputs = inputs;
  }
}
