using Sr.Api.ProductsCatalogue.Application.CreateProduct;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;

namespace Sr.Api.ProductsCatalogue.Application.Persistance
{
  public interface IProductsCatalogueRepository
  {
    Task<Product> CreateProductAsync(CreateProductCommand product);
  }
}
