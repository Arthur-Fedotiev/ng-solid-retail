using FluentResults;
using Sr.Api.ProductsCatalogue.Application.CreateProduct.Commands;
using Sr.Api.ProductsCatalogue.Application.Persistance;
using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Domain.Product;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;
using Sr.Api.ProductsCatalogue.Domain.Product.Errors;
using Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects;
using Sr.Api.ProductsCatalogue.Domain.ValueObjects;

namespace Sr.Api.ProductsCatalogue.Infrastructure
{
  public class InMemoryProductsCatalogueRepository : IProductsCatalogueRepository
  {
    private static readonly List<Product> _products = new();
    public Task<Result<Product>> CreateProductAsync(CreateProductCommand product)
    {
      var newProduct = product.Category switch
      {
        ProductCategory.Books => Book.Create(
          ProductId.CreateUnique(),
          product.Name,
          product.Description,
          product.SKU,
          product.Prices.ConvertAll(price => ProductPrice.Create(price.Value, ProductTier.Tier1, Currency.USDollar)),
          product.Url,
          product.Specifications.AsT2.Cover
          ),
        ProductCategory.Clothing => Clothing.Create(
          ProductId.CreateUnique(),
          product.Name,
          product.Description,
          product.SKU,
          product.Prices.ConvertAll(price => ProductPrice.Create(price.Value, ProductTier.Tier1, Currency.USDollar)),
          product.Url,
          product.Specifications.AsT1.Size,
          product.Specifications.AsT1.Color
          ),
        ProductCategory.Shoes => Shoes.Create(
          ProductId.CreateUnique(),
          product.Name,
          product.Description,
          product.SKU,
          product.Prices.ConvertAll(price => ProductPrice.Create(price.Value, ProductTier.Tier1, Currency.USDollar)),
          product.Url,
          product.Specifications.AsT0.Size,
          product.Specifications.AsT0.Color
          ),
        _ => Result.Fail<Product>(DomainErrors.Product.CategoryNotSupported)
      };

      if (newProduct.IsSuccess)
      {
        _products.Add(newProduct.Value);
      }

      return Task.FromResult(newProduct);
    }
  }
}
