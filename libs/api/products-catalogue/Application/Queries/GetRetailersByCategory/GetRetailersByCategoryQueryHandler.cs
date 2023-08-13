using FluentResults;
using MediatR;
using Sr.Api.ProductsCatalogue.Application.Common;
using Sr.Api.ProductsCatalogue.Application.Persistance;
using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;

namespace Sr.Api.ProductsCatalogue.Application.Queries.GetRetailersByCategory
{
  internal class GetRetailersByCategoryQueryHandler : IRequestHandler<GetRetailersByCategoryQuery, Result<IReadOnlyList<ProductRetailer>>>
  {
    private readonly IProductsCatalogueRepository _productsCatalogueRepository;
    public GetRetailersByCategoryQueryHandler(IProductsCatalogueRepository productsCatalogueRepository)
    {
      _productsCatalogueRepository = productsCatalogueRepository;
    }
    public async Task<Result<IReadOnlyList<ProductRetailer>>> Handle(GetRetailersByCategoryQuery request, CancellationToken cancellationToken)
    {
      var result = await _productsCatalogueRepository.GetRetailersByCategoryAsync(request);

      return result.IsSuccess ?
        Result.Ok(result.Value) : Result.Fail<IReadOnlyList<ProductRetailer>>(result.Errors);
    }
  }
}
