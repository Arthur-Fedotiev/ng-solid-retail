using FluentResults;
using Sr.Api.ProductsCatalogue.Application.CreateProduct.Commands;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;

namespace Sr.Api.ProductsCatalogue.Application.Persistance
{
  public interface IProductsCatalogueRepository
  {
    Task<Result<Product>> CreateProductAsync(CreateProductCommand product);
    Task<Result<List<Product>>> GetProductsAsync();
  }
}
