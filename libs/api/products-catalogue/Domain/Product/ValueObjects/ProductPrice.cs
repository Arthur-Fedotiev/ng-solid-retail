using Sr.Api.ProductsCatalogue.Domain.Common.Models;
using Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects;


namespace Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects;

public sealed class ProductPrice : ValueObject
{
  public decimal Amount { get; }
  public Currency Currency { get; }
  public ProductTier Tier { get; }

  private ProductPrice(decimal amount, ProductTier tier, Currency currency)
  {
    Amount = amount;
    Currency = currency;
    Tier = tier;
  }

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
