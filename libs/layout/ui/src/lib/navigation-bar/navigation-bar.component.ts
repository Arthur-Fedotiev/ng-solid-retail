import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'sr-navigation-bar',
  standalone: true,
  imports: [MatListModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="tw-w-52">
      <mat-nav-list>
        <ng-content></ng-content>
      </mat-nav-list>
    </nav>
  `,
})
export class NavigationBarComponent {}
