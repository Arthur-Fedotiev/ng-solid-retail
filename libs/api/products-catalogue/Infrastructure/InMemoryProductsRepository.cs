using FluentResults;
using Sr.Api.ProductsCatalogue.Application.CreateProduct.Commands;
using Sr.Api.ProductsCatalogue.Application.GetProducts.Queries;
using Sr.Api.ProductsCatalogue.Application.Persistance;
using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;
using Sr.Api.ProductsCatalogue.Domain.Product.Errors;
using Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects;
using Sr.Api.ProductsCatalogue.Domain.ValueObjects;

namespace Sr.Api.ProductsCatalogue.Infrastructure
{
  public class InMemoryProductsCatalogueRepository : IProductsCatalogueRepository
  {
    private static readonly List<Product> _products = new();
    public async Task<Result<Product>> CreateProductAsync(CreateProductCommand product)
    {
      var newProduct = product.Category switch
      {
        ProductCategory.Books => Book.Create(
          ProductId.CreateUnique(),
          product.Name,
          product.Description,
          product.Sku,
          product.Prices.ConvertAll(price => ProductPrice.Create(price.Value, ProductTier.FirstTier, Currency.USDollar)),
          product.Url,
          product.Specifications.AsT2.Cover
          ),
        ProductCategory.Clothing => Clothing.Create(
          ProductId.CreateUnique(),
          product.Name,
          product.Description,
          product.Sku,
          product.Prices.ConvertAll(price => ProductPrice.Create(price.Value, ProductTier.FirstTier, Currency.USDollar)),
          product.Url,
          product.Specifications.AsT1.Size,
          product.Specifications.AsT1.Color
          ),
        ProductCategory.Shoes => Shoes.Create(
          ProductId.CreateUnique(),
          product.Name,
          product.Description,
          product.Sku,
          product.Prices.ConvertAll(price => ProductPrice.Create(price.Value, ProductTier.FirstTier, Currency.USDollar)),
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

      await Task.CompletedTask;

      return newProduct;
    }

    public async Task<(IReadOnlyList<Product> products, int Count)> GetProductsAsync(GetProductsQuery query)
    {
      var products = _products.AsQueryable();

      if (!string.IsNullOrEmpty(query.Ids))
      {
        var ids = query.Ids.Split(',').Select(Guid.Parse);

        products = products.Where(product => ids.Contains(product.Id.Value));
      }

      var total = products.Count();

      if (query.PageSize is not null && query.PageIndex is not null)
      {
        products = products
          .Skip(query.PageSize.Value * query.PageIndex.Value)
          .Take(query.PageSize.Value);
      }

      var result = products.ToList().AsReadOnly<Product>();

      await Task.CompletedTask;

      return (result, total);
    }
  }
}
