using FluentValidation;
using OneOf;

namespace Sr.Api.ProductsCatalogue.Application.Commands.CreateProduct
{
  public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
  {

    public CreateProductCommandValidator()
    {
      _ = RuleFor(x => x.Name).NotEmpty().MinimumLength(3).MaximumLength(100);
      _ = RuleFor(x => x.Description).NotEmpty().MinimumLength(3).MaximumLength(1000);
      _ = RuleFor(x => x.Sku).NotEmpty();
      _ = RuleFor(x => x.Url).NotEmpty();
      _ = RuleFor(x => x.Category).IsInEnum();
      _ = RuleFor(x => x.Prices).NotEmpty()
        .Must(x => x.Count <= 3)
        .Must(prices => prices.Count == prices.Select(x => x.Tier).Distinct().Count())
        .WithMessage("Product price tiers are duplicated");
      _ = RuleForEach(x => x.Prices).SetValidator(new ProductPriceValidator() as IValidator<Price>);
      _ = RuleFor(x => x.Specifications).SetValidator(new ProductSpecificationsValidator());
    }
  }

  public class ProductPriceValidator : AbstractValidator<Price>
  {
    public ProductPriceValidator()
    {
      _ = RuleFor(x => x.Value).GreaterThan(0).WithMessage("Price.Value must be greater than 0");
      _ = RuleFor(x => x.Tier).IsInEnum();
      _ = RuleFor(x => x.CurrencyCode).IsInEnum();
    }
  }

  public class ProductSpecificationsValidator : AbstractValidator<OneOf<ShoesSpecification, ClothingSpecification, BookSpecification>>
  {
    public ProductSpecificationsValidator()
    {
      _ = RuleFor(x => x.AsT0).SetValidator(new ShoesSpecificationValidator()).When(x => x.IsT0);
      _ = RuleFor(x => x.AsT1).SetValidator(new ClothingSpecificationValidator()).When(x => x.IsT1);
      _ = RuleFor(x => x.AsT2).SetValidator(new BookSpecificationValidator()).When(x => x.IsT2);
    }
  }

  public class ShoesSpecificationValidator : AbstractValidator<ShoesSpecification>
  {
    public ShoesSpecificationValidator()
    {
      _ = RuleFor(x => x.Size).NotEmpty().InclusiveBetween(0, 100);
      _ = RuleFor(x => x.Color).NotEmpty();
    }
  }

  public class ClothingSpecificationValidator : AbstractValidator<ClothingSpecification>
  {
    public ClothingSpecificationValidator()
    {
      _ = RuleFor(x => x.Size).NotEmpty();
      _ = RuleFor(x => x.Color).NotEmpty();
    }
  }

  public class BookSpecificationValidator : AbstractValidator<BookSpecification>
  {
    public BookSpecificationValidator()
    {
      _ = RuleFor(x => x.Cover).NotEmpty();
    }
  }
}
