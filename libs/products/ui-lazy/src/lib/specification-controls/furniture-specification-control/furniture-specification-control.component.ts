import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SpecificationSelectComponent } from '../specification-select/specification-select.component';

@Component({
  selector: 'sr-furniture-specification-control',
  standalone: true,
  imports: [SpecificationSelectComponent],
  template: `
    <sr-specification-select
      formControlName="color"
      label="Furniture Color"
      [options]="colors"
    ></sr-specification-select>
    <sr-specification-select
      formControlName="material"
      label="Furniture Material"
      [options]="materials"
    ></sr-specification-select>
  `,
  styleUrls: ['./furniture-specification-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FurnitureSpecificationControlComponent {
  @Input() colors: readonly string[] = [];
  @Input() materials: readonly string[] = [];
}
