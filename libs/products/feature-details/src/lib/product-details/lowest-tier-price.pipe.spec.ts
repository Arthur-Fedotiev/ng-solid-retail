import { LowestTierPricePipe } from './lowest-tier-price.pipe';

const testCases = [
  {
    inputValue: [
      {
        tier: 1,
        price: 1,
      },
      {
        tier: 1,
        price: 1,
      },
      {
        tier: 2,
        price: 2,
      },
      {
        tier: 3,
        price: 3,
      },
    ],
    passedInTier: 1,
    output: 1,
  },
  {
    inputValue: [
      {
        tier: 1,
        price: 1,
      },
      {
        tier: 2,
        price: 2,
      },
      {
        tier: 2,
        price: 1,
      },
      {
        tier: 3,
        price: 3,
      },
    ],
    passedInTier: 2,
    output: 1,
  },
  {
    inputValue: [
      {
        tier: 1,
        price: 1,
      },
    ],
    passedInTier: 2,
    output: null,
  },
];

describe('LowestTierPricePipe', () => {
  it('create an instance', () => {
    const pipe = new LowestTierPricePipe();
    expect(pipe).toBeTruthy();
  });

  it.each(testCases)(
    'should return lowest tier price for tier %p',
    ({ inputValue, passedInTier, output }) => {
      const pipe = new LowestTierPricePipe();

      expect(pipe.transform(inputValue, passedInTier)).toEqual(output);
    }
  );
});
