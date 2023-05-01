using FluentResults;
using MediatR;

namespace Sr.Api.ProductsCatalogue.Application.Commands.DeleteProduct
{
  public record DeleteProductCommand(Guid Id) : IRequest<Result<Guid>>;
}
