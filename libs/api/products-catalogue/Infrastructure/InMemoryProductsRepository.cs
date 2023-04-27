using Sr.Api.ProductsCatalogue.Application.CreateProduct;
using Sr.Api.ProductsCatalogue.Application.Persistance;
using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Domain.Product;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;
using Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects;
using Sr.Api.ProductsCatalogue.Domain.ValueObjects;

namespace Sr.Api.ProductsCatalogue.Infrastructure
{
  public class InMemoryProductsCatalogueRepository : IProductsCatalogueRepository
  {
    private static readonly List<Product> _products = new();
    public Task<Product> CreateProductAsync(CreateProductCommand product)
    {
      Product newProduct = product.Category switch
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
        _ => throw new ArgumentOutOfRangeException(nameof(product.Category), product.Category, null)
      };

      _products.Add(newProduct);

      return Task.FromResult(newProduct);
    }
  }
}
