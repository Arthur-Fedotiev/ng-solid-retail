import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TRACK_BY_ID_OR_IDX } from '@sr/shared/util';
import { PriceFormGroup } from './models/price-form-group.type';
import { validateSize } from './util/validate-size';
import { CREATE_PRODUCT_COMMAND } from './cqrs/commands/create-product.command';
import { CREATE_PRODUCT_VM_QUERY } from './cqrs/queries/create-product-vm.query';
import { FlexLayoutModule } from '@angular/flex-layout';
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
} from '@angular/common';
import {
  CategoryEnum,
  SpecificationsDataService,
} from '@sr/products/application';
import { ProductSizePipe } from './product-size.pipe';
import { SpecificationControlDirective } from './specification-control.directive';
import { CommonModule } from '@angular/common';
import {
  BooksSpecificationControlComponent,
  FurnitureSpecificationControlComponent,
  SpecificationSelectComponent,
  ShoesSpecificationControlComponent,
} from '@sr/products/ui';
import { UntilDestroy } from '@ngneat/until-destroy';

import { ProductColorPipe } from './product-color.pipe';
import { SpecificationsStrategyFactory } from './specifications/specifications-strategy.factory.service';
import { DynamicComponentConfig } from './specifications/strategies';
import { STRATEGY_PROVIDERS } from './specifications/strategy.provider';

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
    FlexLayoutModule,
    ReactiveFormsModule,
    LetModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    ProductSizePipe,
    SpecificationControlDirective,

    SpecificationSelectComponent,
    ShoesSpecificationControlComponent,
    FurnitureSpecificationControlComponent,
    BooksSpecificationControlComponent,
  ],
})
export class CreateProductComponent {
  @ViewChild('specificationContainerView', { read: ViewContainerRef })
  cmpRef!: ViewContainerRef;

  private readonly specificationStrategyFactory = inject(
    SpecificationsStrategyFactory
  );
  private readonly createProductCommand = inject(CREATE_PRODUCT_COMMAND);
  private readonly fb = inject(FormBuilder);

  protected readonly Categories = CategoryEnum;
  protected readonly bookCovers = inject(
    SpecificationsDataService
  ).getCoverTypes();

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
    prices: this.fb.array([this.priceFormGroup], [validateSize(1)]),
  });

  get prices(): FormArray {
    return this.productForm.controls['prices'] as FormArray;
  }

  public updateSpecifications(category: CategoryEnum) {
    const specificationStrategy =
      this.specificationStrategyFactory.create(category);

    this.productForm.setControl(
      'specifications',
      specificationStrategy.buildFormGroup(this.fb)
    );

    this.createSpecificationComponent(
      specificationStrategy.getDynamicComponentConfig()
    );
  }

  public onSave(): void {
    this.createProductCommand.execute(this.productForm.getRawValue());
  }
  public addPrice() {
    this.prices.push(this.priceFormGroup);
  }

  public deletePrice(idx: number) {
    this.prices.removeAt(idx);
  }

  private get priceFormGroup() {
    return this.fb.nonNullable.group({
      tier: [1, [Validators.required, Validators.min(1), Validators.max(3)]],
      retailer: [
        null as unknown as PriceFormGroup['controls']['retailer']['value'],
        Validators.required,
      ],
      price: [0, [Validators.required, Validators.min(1)]],
    });
  }

  private createSpecificationComponent({
    component,
    inputs,
  }: DynamicComponentConfig) {
    this.cmpRef.clear();

    const componentRef = this.cmpRef.createComponent(component);

    Object.entries(inputs).forEach(([key, value]) => {
      Object.assign(componentRef.instance, { [key]: value });
    });
  }
}
