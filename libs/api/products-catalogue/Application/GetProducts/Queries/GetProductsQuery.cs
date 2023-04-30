using FluentResults;
using MediatR;
using Sr.Api.ProductsCatalogue.Application.Common;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;

namespace Sr.Api.ProductsCatalogue.Application.GetProducts.Queries
{
  public record GetProductsQuery(int? PageSize, int? PageIndex, string? Ids) : IRequest<Result<PaginatedItemsResponse<Product>>>;
}
