import { Pipe, PipeTransform } from '@angular/core';
import { TierViewModel } from '@sr/products/application';

@Pipe({
  name: 'srLowestTierPrice',
  standalone: true,
})
export class LowestTierPricePipe implements PipeTransform {
  transform(
    prices: readonly {
      value: number;
      tier: TierViewModel['value'];
    }[],
    lowestTier = 'FirstTier' as const
  ) {
    const tierValueMap = {
      FirstTier: 1,
      SecondTier: 2,
      ThirdTier: 3,
    };

    const lowestPrice = prices.reduce((prev: number | null, curr) => {
      return tierValueMap[curr.tier] === tierValueMap[lowestTier] && prev
        ? Math.min(prev, curr.value)
        : prev;
    }, Infinity);

    return lowestPrice === Infinity ? null : lowestPrice;
  }
}
