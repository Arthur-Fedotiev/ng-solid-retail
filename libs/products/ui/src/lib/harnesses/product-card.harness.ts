import { ComponentHarness } from '@angular/cdk/testing';

export class ProductCardHarness extends ComponentHarness {
  static hostSelector = 'sr-product-card';

  async click(): Promise<void> {
    return (await this.host()).click();
  }
}
