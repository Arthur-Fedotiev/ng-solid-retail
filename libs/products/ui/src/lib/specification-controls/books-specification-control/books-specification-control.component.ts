import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sr-books-specification-control',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule, NgFor],
  template: `
    <mat-form-field appearance="outline">
      <mat-label>{{ label }}</mat-label>
      <mat-select
        placeholder="Select Product {{ label }}"
        [formControl]="control"
      >
        <mat-option *ngFor="let option of options" [value]="option">{{
          option
        }}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: ['./books-specification-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BooksSpecificationControlComponent,
      multi: true,
    },
  ],
})
export class BooksSpecificationControlComponent
  implements ControlValueAccessor
{
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective!: FormControlDirective;

  @Input() label = '';
  @Input() options: readonly string[] = [];
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
