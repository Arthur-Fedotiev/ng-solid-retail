import { Directive, Input, OnInit, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: 'ng-template[srSpecificationControlFor]',
  standalone: true,
})
export class SpecificationControlDirective implements OnInit {
  @Input('srSpecificationControlFor') id: string | null = null;

  public readonly templateRef = inject<TemplateRef<void>>(TemplateRef);

  ngOnInit(): void {
    if (!this.id) {
      throw new Error('id is required');
    }
  }
}
