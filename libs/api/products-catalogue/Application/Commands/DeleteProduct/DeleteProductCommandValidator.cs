using FluentValidation;

namespace Sr.Api.ProductsCatalogue.Application.Commands.DeleteProduct
{
  public class DeleteProductCommandValidator : AbstractValidator<DeleteProductCommand>
  {
    public DeleteProductCommandValidator()
    {
      RuleFor(x => x.Id).NotEmpty().Must(x => Guid.TryParse(x.ToString(), out _));
    }
  }
}
