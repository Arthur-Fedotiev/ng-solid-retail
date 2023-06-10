using FluentResults;
using Sr.Api.ProductsCatalogue.Application.Commands.CreateProduct;
using Sr.Api.ProductsCatalogue.Application.Commands.UpdateProduct;
using Sr.Api.ProductsCatalogue.Application.GetProducts.Queries;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;

namespace Sr.Api.ProductsCatalogue.Application.Persistance
{
  public interface IProductsCatalogueRepository
  {
    Task<Result<Product>> CreateProductAsync(CreateProductCommand product);
    Task<(IReadOnlyList<Product> products, int Count)> GetProductsAsync(GetProductsQuery query);
    Task<Result> DeleteProductAsync(Guid id);
    Task<Result<Product>> UpdateProductAsync(UpdateProductCommand request);
  }
}
