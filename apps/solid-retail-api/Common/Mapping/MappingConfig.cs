using Mapster;
using Sr.Api.ProductsCatalogue.Contracts.CreateProduct;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;
using Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects;
using Price = Sr.Api.ProductsCatalogue.Application.Commands.CreateProduct.Price;
using Sr.Api.ProductsCatalogue.Contracts.Common;
using Sr.Api.ProductsCatalogue.Application.Commands.CreateProduct;

namespace Sr.SolidRetailApi.Common.Mapping
{
  public class MappingConfig : IRegister
  {
    public void Register(TypeAdapterConfig config)
    {
      configureCreateProductCommandMapping(config);
      configureCreateProductResponseMapping(config);
    }

    private static void configureCreateProductCommandMapping(TypeAdapterConfig config)
    {
      _ = config.NewConfig<CreateProductRequest, CreateProductCommand>()
            .Include<CreateShoesRequest, CreateProductCommand>()
            .Include<CreateClothingRequest, CreateProductCommand>()
            .Include<CreateBookRequest, CreateProductCommand>()
            .Map(dest => dest.Sku, src => src.SKU)
            .Map(dest => dest.Prices, src => src.Prices.ConvertAll(price => new Price(price.Value, price.Tier, price.Currency)));

      _ = config.ForType<CreateShoesRequest, CreateProductCommand>()
            .Map(dest => dest.Specifications, src => new ShoesSpecification(src.Specifications.Size, src.Specifications.Color));

      _ = config.ForType<CreateClothingRequest, CreateProductCommand>()
            .Map(dest => dest.Specifications, src => new ClothingSpecification(src.Specifications.Size, src.Specifications.Color));

      _ = config.ForType<CreateBookRequest, CreateProductCommand>()
            .Map(dest => dest.Specifications, src => new BookSpecification(src.Specifications.Cover));
    }

    private static void configureCreateProductResponseMapping(TypeAdapterConfig config)
    {
      _ = config.NewConfig<Product, ProductResponse>()
            .Include<Shoes, ShoesResponse>()
            .Include<Clothing, ClothingResponse>()
            .Include<Book, BookResponse>()
            .Map(dest => dest.Id, src => src.Id.Value);

      _ = config.ForType<Shoes, ShoesResponse>()
      .ConstructUsing((src) => new ShoesResponse(
        src.Id.Value,
        src.Name,
        src.Description,
        src.Sku,
        src.Url,
        src.Prices.ToList().ConvertAll(price => new PriceResponse(price.Amount, price.Tier, price.Currency.Code)),
        new ShoesSpecificationResponse(src.ShoesSize, src.Color)));

      _ = config.ForType<Clothing, ClothingResponse>()
      .ConstructUsing((src) => new ClothingResponse(
        src.Id.Value,
        src.Name,
        src.Description,
        src.Sku,
        src.Url,
        src.Prices.ToList().ConvertAll(price => new PriceResponse(price.Amount, price.Tier, price.Currency.Code)),
        new ClothingSpecificationResponse(src.ClothingSize, src.Color)));


      _ = config.ForType<Book, BookResponse>()
      .ConstructUsing((src) => new BookResponse(
        src.Id.Value,
        src.Name,
        src.Description,
        src.Sku,
        src.Url,
        src.Prices.ToList().ConvertAll(price => new PriceResponse(price.Amount, price.Tier, price.Currency.Code)),
        new BookSpecificationResponse(src.Cover)));

      _ = config.NewConfig<ProductPrice, PriceResponse>()
             .Map(dest => dest.Value, src => src.Amount)
             .Map(dest => dest.Currency, src => src.Currency.Code);
    }
  }


}
