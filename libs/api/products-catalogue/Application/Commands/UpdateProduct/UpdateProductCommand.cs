﻿using FluentResults;
using MediatR;
using OneOf;
using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;

namespace Sr.Api.ProductsCatalogue.Application.Commands.UpdateProduct
{
  public record UpdateProductCommand(
    Guid Id,
    ProductCategory Category,
    string Name,
    string Description,
    string Sku,
    string Url,
    List<Price> Prices,
    ProductRetailer Retailer,
    OneOf<ShoesSpecification, ClothingSpecification, BookSpecification> Specifications) : IRequest<Result<Product>>;

  public record Price(decimal Value, ProductTier Tier, CurrencyCode CurrencyCode);

  public record ShoesSpecification(float Size, string Color);

  public record ClothingSpecification(string Size, string Color);

  public record BookSpecification(string Cover);
}
