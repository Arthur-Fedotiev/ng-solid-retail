import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  inject,
} from '@angular/core';
import { NgFor } from '@angular/common';
import {
  ReactiveFormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormControlDirective,
  FormControl,
  ControlContainer,
  FormGroup,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BooksSpecificationControlComponent } from '../books-specification-control/books-specification-control.component';

@Component({
  selector: 'sr-shoes-specification-control',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule, NgFor],
  template: `
    <mat-form-field appearance="outline">
      <mat-label>Color</mat-label>
      <mat-select placeholder="Select Shoes Color" formControlName="color">
        <mat-option *ngFor="let color of colors" [value]="color">{{
          color
        }}</mat-option>
      </mat-select>
    </mat-form-field>
    <mat-form-field appearance="outline">
      <mat-label>Size</mat-label>
      <mat-select placeholder="Select Shoes size" formControlName="size">
        <mat-option *ngFor="let size of sizes" [value]="size">{{
          size
        }}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: ['./shoes-specification-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BooksSpecificationControlComponent,
      multi: true,
    },
  ],
})
export class ShoesSpecificationControlComponent
  implements ControlValueAccessor
{
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective!: FormControlDirective;

  @Input() colors: readonly string[] = [];
  @Input() sizes: readonly string[] = [];

  @Input() formControl!: FormControl;
  @Input() formControlName!: string;

  private readonly controlContainer = inject(ControlContainer);

  get control() {
    return (
      this.formControl ||
      (this.controlContainer.control as FormGroup).get(this.formControlName)
    );
  }

  registerOnTouched(fn: any): void {
    this.formControlDirective?.valueAccessor?.registerOnTouched(fn);
  }

  registerOnChange(fn: any): void {
    this.formControlDirective?.valueAccessor?.registerOnChange(fn);
  }

  writeValue(obj: any): void {
    this.formControlDirective?.valueAccessor?.writeValue(obj);
  }

  setDisabledState(isDisabled: boolean): void {
    this.formControlDirective?.valueAccessor?.setDisabledState?.(isDisabled);
  }
}
