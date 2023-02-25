import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { NavigationBarComponent } from '@sr/layout/ui';
import { ProfileToolbarComponent } from '@sr/layout/ui';

@Component({
  selector: 'sr-layout-feature',
  styleUrls: ['./layout-feature.component.scss'],
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatSidenavModule,
    MatIconModule,

    MatButtonModule,
    MatListModule,

    RouterLink,
    RouterOutlet,

    NavigationBarComponent,
    ProfileToolbarComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-sidenav-container fullscreen>
      <mat-sidenav #sideNav (click)="sideNav.close()">
        <sr-navigation-bar class="nav-bar">
          <a class="nav-bar__item" mat-list-item [routerLink]="['products']">
            <mat-icon class="nav-bar__icon">local_grocery_store</mat-icon>
            <span>Products</span>
          </a>
          <a
            class="nav-bar__item"
            mat-list-item
            [routerLink]="['products', 'create']"
          >
            <mat-icon class="nav-bar__icon">library_add</mat-icon>
            <span>Create product</span>
          </a></sr-navigation-bar
        >
      </mat-sidenav>
      <mat-drawer-container class="drawer">
        <mat-drawer fxHide.lt-lg class="drawer__sidebar" mode="side" opened>
          <button
            class="drawer__trigger"
            mat-icon-button
            (click)="sideNav.open('mouse')"
          >
            <mat-icon
              aria-hidden="false"
              aria-label="Menu icon"
              fontIcon="menu"
            ></mat-icon>
          </button>
        </mat-drawer>
        <mat-drawer-content color="accent">
          <!-- TODO: add user data as an input instead of hard code -->
          <header>
            <sr-profile-toolbar>
              <button
                fxHide.gt-md
                class="drawer__trigger"
                mat-icon-button
                (click)="sideNav.open('mouse')"
              >
                <mat-icon
                  aria-hidden="false"
                  aria-label="Menu icon"
                  fontIcon="menu"
                ></mat-icon>
              </button>
            </sr-profile-toolbar>
          </header>
          <main class="content">
            <router-outlet></router-outlet>
          </main>
        </mat-drawer-content>
      </mat-drawer-container>
    </mat-sidenav-container>
  `,
})
export class LayoutFeatureComponent {}
