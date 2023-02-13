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
  templateUrl: './layout-feature.component.html',
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
})
export class LayoutFeatureComponent {}
