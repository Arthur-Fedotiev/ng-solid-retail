using MediatR;
using OneOf;
using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;

namespace Sr.Api.ProductsCatalogue.Application.CreateProduct
{
  public record CreateProductCommand(
    ProductCategory Category,
    string Name,
    string Description,
    string SKU,
    string Url,
    List<Price> Prices,
    OneOf<ShoesSpecification, ClothingSpecification, BookSpecification> Specifications) : IRequest<Product>;

  public record Price(decimal Value, string Currency);

  public record ShoesSpecification(float Size, string Color);

  public record ClothingSpecification(string Size, string Color);

  public record BookSpecification(string Cover);
}
