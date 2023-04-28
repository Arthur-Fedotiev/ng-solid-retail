using Mapster;
using Sr.Api.ProductsCatalogue.Contracts.CreateProduct;
using CommonContracts = Sr.Api.ProductsCatalogue.Contracts.Common;
using Sr.Api.ProductsCatalogue.Application.CreateProduct.Commands;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;
using Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects;
using Price = Sr.Api.ProductsCatalogue.Application.CreateProduct.Commands.Price;

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
            .Map(dest => dest.Prices, src => src.Prices.ConvertAll(price => new Price(price.Value, price.Currency)));

      _ = config.ForType<CreateShoesRequest, CreateProductCommand>()
            .Map(dest => dest.Specifications, src => new ShoesSpecification(src.Specifications.Size, src.Specifications.Color));

      _ = config.ForType<CreateClothingRequest, CreateProductCommand>()
            .Map(dest => dest.Specifications, src => new ClothingSpecification(src.Specifications.Size, src.Specifications.Color));

      _ = config.ForType<CreateBookRequest, CreateProductCommand>()
            .Map(dest => dest.Specifications, src => new BookSpecification(src.Specifications.Cover));
    }

    private static void configureCreateProductResponseMapping(TypeAdapterConfig config)
    {
      _ = config.NewConfig<Product, CreateProductResponse>()
            .Include<Shoes, CreateShoesResponse>()
            .Include<Clothing, CreateClothingResponse>()
            .Include<Book, CreateBookResponse>()
            .Map(dest => dest.Id, src => src.Id.Value);

      _ = config.ForType<Shoes, CreateShoesResponse>()
      .ConstructUsing((src) => new CreateShoesResponse(
        src.Id.Value,
        src.Name,
        src.Description,
        src.SKU,
        src.Url,
        src.Prices.ToList().ConvertAll(price => new PriceResponse(price.Amount, price.Currency.Code)),
        new CommonContracts.ShoesSpecification(src.ShoesSize, src.Color)));

      _ = config.ForType<Clothing, CreateClothingResponse>()
      .ConstructUsing((src) => new CreateClothingResponse(
        src.Id.Value,
        src.Name,
        src.Description,
        src.SKU,
        src.Url,
        src.Prices.ToList().ConvertAll(price => new PriceResponse(price.Amount, price.Currency.Code)),
        new CommonContracts.ClothingSpecification(src.ClothingSize, src.Color)));


      _ = config.ForType<Book, CreateBookResponse>()
      .ConstructUsing((src) => new CreateBookResponse(
        src.Id.Value,
        src.Name,
        src.Description,
        src.SKU,
        src.Url,
        src.Prices.ToList().ConvertAll(price => new PriceResponse(price.Amount, price.Currency.Code)),
        new CommonContracts.BookSpecification(src.Cover)));

      _ = config.NewConfig<ProductPrice, PriceResponse>()
             .Map(dest => dest.Value, src => src.Amount)
             .Map(dest => dest.Currency, src => src.Currency.Code);
    }
  }


}
