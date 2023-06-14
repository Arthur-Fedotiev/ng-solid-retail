using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Domain.Common.Models;


namespace Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects
{
  public sealed class ProductPrice : ValueObject
  {
    public decimal Amount { get; private set; }
    public Currency Currency { get; private set; }
    public ProductTier Tier { get; private set; }

    private ProductPrice(decimal amount, ProductTier tier, Currency currency)
    {
      Amount = amount;
      Currency = currency;
      Tier = tier;
    }

#pragma warning disable CS8618
    private ProductPrice()
    {
    }
#pragma warning restore CS8618

    public static ProductPrice Create(
      decimal amount,
      ProductTier tier,
      Currency? currency)
    {
      return new ProductPrice(amount, tier, currency ?? Currency.USDollar);
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
      yield return Amount;
      yield return Currency;
      yield return Tier;
    }
  }
}
