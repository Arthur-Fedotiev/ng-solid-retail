using FluentResults;
using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Domain.Product.Errors;
using Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects;
using Sr.Api.Shared.Domain.Models;

namespace Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot
{
  public abstract class Product : AggregateRoot<ProductId>
  {
    protected readonly List<ProductPrice> _prices = new();

    public abstract ProductCategory Category { get; protected set; }
    public string Name { get; protected set; }
    public string Description { get; protected set; }
    public string Sku { get; protected set; }
    public string Url { get; protected set; }
    public ProductRetailer Retailer { get; protected set; }

    public IReadOnlyList<ProductPrice> Prices => _prices.AsReadOnly();

    protected Product(
      ProductId id,
      string name,
      string description,
      string sku,
      List<ProductPrice> prices,
      ProductRetailer retailer,
      string url) : base(id)
    {
      {
        Name = name;
        Description = description;
        Sku = sku;
        Url = url;
        Retailer = retailer;
        _prices = prices;
      }
    }

#pragma warning disable CS8618
    protected Product()
    {
    }
#pragma warning restore CS8618

    public Result<ProductPrice> AddPrice(ProductPrice price)
    {
      if (_prices.Any(p => p.Tier == price.Tier))
      {
        return Result.Fail(DomainErrors.Product.ProductPriceAlreadyExistsForTierException);
      }

      if (_prices.Any(p => p.Tier > price.Tier && p.Amount < price.Amount))
      {
        return Result.Fail(DomainErrors.Product.ProductPriceLowerTierHigherThanForHigherTier);
      }

      if (_prices.Any(p => p.Tier < price.Tier && p.Amount > price.Amount))
      {
        return Result.Fail(DomainErrors.Product.ProductPriceHigherTierLowerThanForLowerTier);
      }

      _prices.Add(price);

      return price;
    }
  }
}
