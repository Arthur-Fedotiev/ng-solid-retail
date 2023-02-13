import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'sr-navigation-bar',
  styleUrls: ['./navigation-bar.component.scss'],
  standalone: true,
  imports: [MatListModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="nav-container">
      <mat-nav-list class="nav-container__list">
        <ng-content></ng-content>
      </mat-nav-list>
    </nav>
  `,
})
export class NavigationBarComponent {}
