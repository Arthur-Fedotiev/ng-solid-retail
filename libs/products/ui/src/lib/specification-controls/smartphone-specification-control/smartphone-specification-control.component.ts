import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sr-smartphone-specification-control',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>smartphone-specification-control works!</p> `,
  styleUrls: ['./smartphone-specification-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartphoneSpecificationControlComponent {}
