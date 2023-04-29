using FluentValidation;
using OneOf;

namespace Sr.Api.ProductsCatalogue.Application.CreateProduct.Commands;

public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
{

  public CreateProductCommandValidator()
  {
    RuleFor(x => x.Name).NotEmpty().MinimumLength(3).MaximumLength(100);
    RuleFor(x => x.Description).NotEmpty().MinimumLength(3).MaximumLength(1000);
    RuleFor(x => x.Sku).NotEmpty();
    RuleFor(x => x.Url).NotEmpty();
    RuleFor(x => x.Category).IsInEnum();
    RuleFor(x => x.Prices).NotEmpty()
      .Must(x => x.Count <= 3)
      .Must(prices => prices.Count() == prices.Select(x => x.Tier).Distinct().Count())
      .WithMessage("Product price tiers are duplicated");
    RuleForEach(x => x.Prices).SetValidator(new ProductPriceValidator() as IValidator<Price>);
    RuleFor(x => x.Specifications).SetValidator(new ProductSpecificationsValidator());
  }
}

public class ProductPriceValidator : AbstractValidator<Price>
{
  public ProductPriceValidator()
  {
    RuleFor(x => x.Value).GreaterThan(0).WithMessage("Price.Value must be greater than 0");
    RuleFor(x => x.Tier).IsInEnum();
    RuleFor(x => x.CurrencyCode).IsInEnum();
  }
}

public class ProductSpecificationsValidator : AbstractValidator<OneOf<ShoesSpecification, ClothingSpecification, BookSpecification>>
{
  public ProductSpecificationsValidator()
  {
    RuleFor(x => x.AsT0).SetValidator(new ShoesSpecificationValidator()).When(x => x.IsT0);
    RuleFor(x => x.AsT1).SetValidator(new ClothingSpecificationValidator()).When(x => x.IsT1);
    RuleFor(x => x.AsT2).SetValidator(new BookSpecificationValidator()).When(x => x.IsT2);
  }
}

public class ShoesSpecificationValidator : AbstractValidator<ShoesSpecification>
{
  public ShoesSpecificationValidator()
  {
    RuleFor(x => x.Size).NotEmpty().InclusiveBetween(0, 100);
    RuleFor(x => x.Color).NotEmpty();
  }
}

public class ClothingSpecificationValidator : AbstractValidator<ClothingSpecification>
{
  public ClothingSpecificationValidator()
  {
    RuleFor(x => x.Size).NotEmpty();
    RuleFor(x => x.Color).NotEmpty();
  }
}

public class BookSpecificationValidator : AbstractValidator<BookSpecification>
{
  public BookSpecificationValidator()
  {
    RuleFor(x => x.Cover).NotEmpty();
  }
}
