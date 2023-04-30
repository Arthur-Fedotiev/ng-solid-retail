using FluentResults;
using FluentValidation;
using MediatR;
using Sr.Api.ProductsCatalogue.Domain.Product.Errors;

namespace Sr.Api.ProductsCatalogue.Application.Common
{
  public class ValidationBehavior<TRequest, TResponse>
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
    where TResponse : IResultBase
  {
    private readonly IValidator<TRequest>? _validator;

    public ValidationBehavior(IValidator<TRequest>? validator)
    {
      _validator = validator;
    }


    public async Task<TResponse> Handle(
      TRequest request,
      RequestHandlerDelegate<TResponse> next,
      CancellationToken cancellationToken)
    {


      if (_validator == null)
      {
        return await next();
      }

      var validationResult = await _validator.ValidateAsync(request, cancellationToken);

      if (validationResult.IsValid)
      {
        return await next();

      }

      var errors = validationResult.Errors.Select(err => DomainErrors.Product.ValidationError(err.ErrorMessage));
      dynamic result = Result.Fail(errors);

      return result;
    }
  }
}
