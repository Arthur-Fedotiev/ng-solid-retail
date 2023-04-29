using FluentResults;
using MediatR;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;
using Sr.Api.ProductsCatalogue.Domain.Product.Errors;

namespace Sr.Api.ProductsCatalogue.Application.CreateProduct.Commands
{
  public class CreateProductCommandValidateBehavior : IPipelineBehavior<CreateProductCommand, Result<Product>>
  {
    public async Task<Result<Product>> Handle(CreateProductCommand request, RequestHandlerDelegate<Result<Product>> next, CancellationToken cancellationToken)
    {
      var validationResult = await new CreateProductCommandValidator().ValidateAsync(request, cancellationToken);

      return !validationResult.IsValid
        ? Result.Fail<Product>(validationResult.Errors.Select(err => DomainErrors.Product.ValidationError(err.ErrorMessage)))
        : await next();
    }
  }
}
