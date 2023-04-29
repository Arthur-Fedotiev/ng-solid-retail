using FluentResults;
using MediatR;
using Sr.Api.ProductsCatalogue.Application.Persistance;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;

namespace Sr.Api.ProductsCatalogue.Application.GetProducts.Queries
{
  public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, Result<List<Product>>>
  {
    private readonly IProductsCatalogueRepository _productsCatalogueRepository;
    public GetProductsQueryHandler(IProductsCatalogueRepository productsCatalogueRepository)
    {
      _productsCatalogueRepository = productsCatalogueRepository;
    }
    public async Task<Result<List<Product>>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
      return await _productsCatalogueRepository.GetProductsAsync();
    }
  }
}
