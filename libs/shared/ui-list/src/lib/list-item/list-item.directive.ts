import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[srListItem]',
  standalone: true,
})
export class ListItemDirective<T = unknown> {
  @Input() srListItem: T[] | '' = '';

  readonly template = inject(TemplateRef);

  static ngTemplateContextGuard<T>(
    dir: ListItemDirective<T>,
    ctx: unknown
  ): ctx is { $implicit: T } {
    return true;
  }
}
