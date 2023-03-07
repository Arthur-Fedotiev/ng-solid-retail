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

@Component({
  selector: 'sr-specification-select',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule, NgFor],
  template: `
    <mat-form-field appearance="outline">
      <mat-label>{{ label }}</mat-label>
      <mat-select placeholder="Select {{ label }}" [formControl]="control">
        <mat-option *ngFor="let option of options" [value]="option">{{
          option
        }}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: ['./specification-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SpecificationSelectComponent,
      multi: true,
    },
  ],
})
export class SpecificationSelectComponent implements ControlValueAccessor {
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

  registerOnTouched(fn: () => void): void {
    this.formControlDirective?.valueAccessor?.registerOnTouched(fn);
  }

  registerOnChange(fn: () => void): void {
    this.formControlDirective?.valueAccessor?.registerOnChange(fn);
  }

  writeValue(obj: unknown): void {
    this.formControlDirective?.valueAccessor?.writeValue(obj);
  }

  setDisabledState(isDisabled: boolean): void {
    this.formControlDirective?.valueAccessor?.setDisabledState?.(isDisabled);
  }
}
