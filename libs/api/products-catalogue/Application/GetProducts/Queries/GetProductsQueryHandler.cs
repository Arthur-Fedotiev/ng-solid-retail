using FluentResults;
using MediatR;
using Sr.Api.ProductsCatalogue.Application.Common;
using Sr.Api.ProductsCatalogue.Application.Persistance;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;

namespace Sr.Api.ProductsCatalogue.Application.GetProducts.Queries
{
  public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, Result<PaginatedItemsResponse<Product>>>
  {
    private readonly IProductsCatalogueRepository _productsCatalogueRepository;
    public GetProductsQueryHandler(IProductsCatalogueRepository productsCatalogueRepository)
    {
      _productsCatalogueRepository = productsCatalogueRepository;
    }
    public async Task<Result<PaginatedItemsResponse<Product>>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
      (var result, var count) = await _productsCatalogueRepository.GetProductsAsync(request);

      return new PaginatedItemsResponse<Product>(
        request.PageIndex.GetValueOrDefault(),
        request.PageSize.GetValueOrDefault(),
        count,
        result
      );
    }
  }
}
