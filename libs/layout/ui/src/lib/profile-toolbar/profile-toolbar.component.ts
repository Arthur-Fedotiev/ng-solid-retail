import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'sr-profile-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./profile-toolbar.component.scss'],
  template: `<mat-toolbar class="toolbar">
    <ng-content></ng-content>
    <div class="toolbar__profile">
      <img
        [src]="
          'https://i.pinimg.com/280x280_RS/a9/7d/6f/a97d6f224a5526c8a49eedc19f0a73c4.jpg'
        "
        class="toolbar__avatar"
      />
      <span>John Doe</span>
      <button
        mat-icon-button
        [matMenuTriggerFor]="menu"
        aria-label="Open profile menu"
      >
        <mat-icon>keyboard_arrow_down</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item>
          <mat-icon>dialpad</mat-icon>
          <span>Redial</span>
        </button>
        <button mat-menu-item disabled>
          <mat-icon>voicemail</mat-icon>
          <span>Check voice mail</span>
        </button>
        <button mat-menu-item>
          <mat-icon>notifications_off</mat-icon>
          <span>Disable alerts</span>
        </button>
      </mat-menu>
    </div>
  </mat-toolbar> `,
})
export class ProfileToolbarComponent {}
