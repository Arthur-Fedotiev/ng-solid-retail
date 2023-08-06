import {
  Component,
  ChangeDetectionStrategy,
  Input,
  inject,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  ControlContainer,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SpecificationSelectComponent } from '../specification-select/specification-select.component';

@Component({
  selector: 'sr-books-specification-control',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    SpecificationSelectComponent,
    MatInputModule,
  ],
  template: `
    <form [formGroup]="productForm" class="tw-flex tw-align-baseline tw-gap-2 ">
    <sr-specification-select
            formControlName="cover"
            label="Book Cover"
            [options]="coverOptions"
          />
      <mat-form-field appearance="outline">
        <mat-label>Author</mat-label>
        <input matInput formControlName="author" />
      </mat-form-field>
    </form>
  `,
  styleUrls: ['./books-specification-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksSpecificationControlComponent {
  @Input({ required: true }) coverOptions: readonly string[] = [];

  protected readonly productForm = <FormGroup>inject(ControlContainer).control;
}
