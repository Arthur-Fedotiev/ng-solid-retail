import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'omnia-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
