import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sr-shoes-size-specification-control',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>shoes-size-specification-control works!</p> `,
  styleUrls: ['./shoes-size-specification-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoesSizeSpecificationControlComponent {}
