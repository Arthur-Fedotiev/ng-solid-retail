import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SpecificationSelectComponent } from '../specification-select/specification-select.component';

@Component({
  selector: 'sr-shoes-specification-control',
  standalone: true,
  imports: [SpecificationSelectComponent],
  template: `
           <sr-specification-select
            formControlName="color"
            label="Shoes Color"
            [options]="colors"
          />
          <sr-specification-select
            formControlName="size"
            label="Shoes Size"
            [options]="shoesSizes"
          />
  `,
  styleUrls: ['./shoes-specification-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoesSpecificationControlComponent {
  @Input() colors: readonly string[] = [];
  @Input() shoesSizes: readonly (string | number)[] = [];
}
