import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sr-clothing-specification-control',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>clothing-specification-control works!</p> `,
  styleUrls: ['./clothing-specification-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClothingSpecificationControlComponent {}
