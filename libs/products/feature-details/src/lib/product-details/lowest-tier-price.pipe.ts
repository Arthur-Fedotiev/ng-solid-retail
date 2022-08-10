import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Pipe({
  name: 'omniaLowestTierPrice',
})
export class LowestTierPricePipe implements PipeTransform {
  transform(
    value: readonly { price: number; tier: number }[],
    tier: number = 1
  ): number | null {
    const lowestPrice = value.reduce((prev: number | null, curr) => {
      return curr.tier === tier && prev ? Math.min(prev, curr.price) : prev;
    }, Infinity);

    return lowestPrice === Infinity ? null : lowestPrice;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [LowestTierPricePipe],
  exports: [LowestTierPricePipe],
})
export class LowestTierPricePipeModule {}
