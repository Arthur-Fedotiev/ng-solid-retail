
using FluentResults;

namespace Sr.Api.ProductsCatalogue.Domain.Product.Errors
{
  public static class DomainErrors
  {
    public static class Product
    {
      public static readonly IError ProductPriceAlreadyExistsForTierException = new Error("Product price already exists for tier").WithMetadata("StatusCode", 400);
      public static readonly IError ProductPriceLowerTierHigherThanForHigherTier = new Error("Product price lower tier higher than for higher tier").WithMetadata("StatusCode", 400);
      public static readonly IError ProductPriceHigherTierLowerThanForLowerTier = new Error("Product price higher tier lower than for lower tier").WithMetadata("StatusCode", 400);
      public static readonly IError CategoryNotSupported = new Error("Category not supported").WithMetadata("StatusCode", 400);
    }
  }
}
