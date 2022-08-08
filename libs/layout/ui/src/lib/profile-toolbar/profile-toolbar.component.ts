import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'omnia-profile-toolbar',
  templateUrl: './profile-toolbar.component.html',
  styleUrls: ['./profile-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileToolbarComponent {}
