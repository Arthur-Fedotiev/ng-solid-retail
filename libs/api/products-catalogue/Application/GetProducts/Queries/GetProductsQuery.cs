using FluentResults;
using MediatR;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;

namespace Sr.Api.ProductsCatalogue.Application.GetProducts.Queries
{
  public record GetProductsQuery() : IRequest<Result<List<Product>>>;
}
