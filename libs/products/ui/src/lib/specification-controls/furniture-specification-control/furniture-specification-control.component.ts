import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sr-furniture-specification-control',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>furniture-specification-control works!</p> `,
  styleUrls: ['./furniture-specification-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FurnitureSpecificationControlComponent {}
