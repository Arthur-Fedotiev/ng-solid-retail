using FluentValidation;

namespace Sr.Api.ProductsCatalogue.Application.GetProducts.Queries
{
  public class GetProductsQueryValidator : AbstractValidator<GetProductsQuery>
  {
    public GetProductsQueryValidator()
    {
      RuleFor(x => x.PageIndex).GreaterThanOrEqualTo(0);
      RuleFor(x => x.PageSize).GreaterThanOrEqualTo(0);
      RuleFor(x => x.Ids).Must(x => x!.Split(',')
        .All(s => Guid.TryParse(s, out _)))
        .When(x => !string.IsNullOrEmpty(x.Ids))
        .WithMessage("Ids must be a comma separated list of GUID's");
    }
  }
}
