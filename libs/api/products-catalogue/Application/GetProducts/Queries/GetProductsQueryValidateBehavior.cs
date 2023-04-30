using FluentResults;
using MediatR;
using Sr.Api.ProductsCatalogue.Application.Common;
using Sr.Api.ProductsCatalogue.Application.GetProducts.Queries;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;
using Sr.Api.ProductsCatalogue.Domain.Product.Errors;

namespace Sr.Api.ProductsCatalogue.Application.CreateProduct.Commands
{
  public class GetProductsQueryValidateBehavior : IPipelineBehavior<GetProductsQuery, Result<PaginatedItemsResponse<Product>>>
  {
    private readonly GetProductsQueryValidator _validator;

    public GetProductsQueryValidateBehavior(GetProductsQueryValidator validator)
    {
      _validator = validator;
    }


    public async Task<Result<PaginatedItemsResponse<Product>>> Handle(
      GetProductsQuery request,
      RequestHandlerDelegate<Result<PaginatedItemsResponse<Product>>> next,
      CancellationToken cancellationToken)
    {
      var validationResult = await _validator.ValidateAsync(request, cancellationToken);

      return !validationResult.IsValid
        ? Result.Fail(validationResult.Errors.Select(err => DomainErrors.Product.ValidationError(err.ErrorMessage)))
        : await next();
    }
  }
}
