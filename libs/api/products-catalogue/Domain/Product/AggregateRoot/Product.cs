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

    public abstract ProductCategory Category { get; }
    public string Name { get; }
    public string Description { get; }
    public string Sku { get; }
    public string Url { get; }
    public ProductRetailerId RetailerId { get; }

    public IReadOnlyList<ProductPrice> Prices => _prices.AsReadOnly();

    protected Product(
      ProductId id,
      string name,
      string description,
      string sku,
      List<ProductPrice> prices,
      ProductRetailerId retailerId,
      string url) : base(id)
    {
      {
        Name = name;
        Description = description;
        Sku = sku;
        Url = url;
        RetailerId = retailerId;
        _prices = prices;
      }
    }

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
