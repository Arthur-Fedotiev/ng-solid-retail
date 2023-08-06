import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'srLowestTierPrice',
  standalone: true,
})
export class LowestTierPricePipe implements PipeTransform {
  transform(
    value: readonly { price: number; tier: number }[],
    tier = 1
  ): number | null {
    const lowestPrice = value.reduce((prev: number | null, curr) => {
      return curr.tier === tier && prev ? Math.min(prev, curr.price) : prev;
    }, Infinity);

    return lowestPrice === Infinity ? null : lowestPrice;
  }
}
