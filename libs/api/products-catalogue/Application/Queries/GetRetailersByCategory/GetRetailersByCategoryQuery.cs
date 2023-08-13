using FluentResults;
using MediatR;
using Sr.Api.ProductsCatalogue.Common;

namespace Sr.Api.ProductsCatalogue.Application.Queries.GetRetailersByCategory
{
  public record GetRetailersByCategoryQuery(ProductCategory category) : IRequest<Result<IReadOnlyList<ProductRetailer>>>;
}
