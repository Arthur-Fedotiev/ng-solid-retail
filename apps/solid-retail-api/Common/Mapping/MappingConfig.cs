using Mapster;
using Sr.Api.ProductsCatalogue.Contracts.CreateProduct;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;
using Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects;
using Price = Sr.Api.ProductsCatalogue.Application.Commands.CreateProduct.Price;
using Sr.Api.ProductsCatalogue.Contracts.Common;
using Sr.Api.ProductsCatalogue.Application.Commands.CreateProduct;
using Sr.Api.ProductsCatalogue.Contracts.UpdateProduct;
using UpdateProduct = Sr.Api.ProductsCatalogue.Application.Commands.UpdateProduct;
using CreateProduct = Sr.Api.ProductsCatalogue.Application.Commands.CreateProduct;
using Sr.Api.ProductsCatalogue.Application.Commands.UpdateProduct;

namespace Sr.SolidRetailApi.Common.Mapping
{
  public class MappingConfig : IRegister
  {
    public void Register(TypeAdapterConfig config)
    {
      configureCreateProductCommandMapping(config);
      configureCreateProductResponseMapping(config);
      configureUpdateProductMapping(config);
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
            .Map(dest => dest.Specifications, src => new CreateProduct.ShoesSpecification(src.Specifications.Size, src.Specifications.Color));

      _ = config.ForType<CreateClothingRequest, CreateProductCommand>()
            .Map(dest => dest.Specifications, src => new CreateProduct.ClothingSpecification(src.Specifications.Size, src.Specifications.Color));

      _ = config.ForType<CreateBookRequest, CreateProductCommand>()
            .Map(dest => dest.Specifications, src => new CreateProduct.BookSpecification(src.Specifications.Cover));
    }

    private static void configureUpdateProductMapping(TypeAdapterConfig config)
    {
      _ = config.NewConfig<UpdateProductRequest, UpdateProductCommand>()
            .Include<UpdateShoesRequest, UpdateProductCommand>()
            .Include<UpdateClothingRequest, UpdateProductCommand>()
            .Include<UpdateBookRequest, UpdateProductCommand>()
            .Map(dest => dest.Sku, src => src.SKU)
            .Map(dest => dest.Prices, src => src.Prices.ConvertAll(price => new Price(price.Value, price.Tier, price.Currency)));

      _ = config.ForType<UpdateShoesRequest, UpdateProductCommand>()
            .Map(dest => dest.Specifications, src => new UpdateProduct.ShoesSpecification(src.Specifications.Size, src.Specifications.Color));

      _ = config.ForType<UpdateClothingRequest, UpdateProductCommand>()
            .Map(dest => dest.Specifications, src => new UpdateProduct.ClothingSpecification(src.Specifications.Size, src.Specifications.Color));

      _ = config.ForType<UpdateBookRequest, UpdateProductCommand>()
            .Map(dest => dest.Specifications, src => new UpdateProduct.BookSpecification(src.Specifications.Cover));
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
        src.Retailer,
        src.Url,
        src.Prices.ToList().ConvertAll(price => new PriceResponse(price.Amount, price.Tier, price.Currency.Code)),
        new ShoesSpecificationResponse(src.ShoesSize, src.Color)));

      _ = config.ForType<Clothing, ClothingResponse>()
      .ConstructUsing((src) => new ClothingResponse(
        src.Id.Value,
        src.Name,
        src.Description,
        src.Sku,
        src.Retailer,
        src.Url,
        src.Prices.ToList().ConvertAll(price => new PriceResponse(price.Amount, price.Tier, price.Currency.Code)),
        new ClothingSpecificationResponse(src.ClothingSize, src.Color)));


      _ = config.ForType<Book, BookResponse>()
      .ConstructUsing((src) => new BookResponse(
        src.Id.Value,
        src.Name,
        src.Description,
        src.Sku,
        src.Retailer,
        src.Url,
        src.Prices.ToList().ConvertAll(price => new PriceResponse(price.Amount, price.Tier, price.Currency.Code)),
        new BookSpecificationResponse(src.Cover)));

      _ = config.NewConfig<ProductPrice, PriceResponse>()
             .Map(dest => dest.Value, src => src.Amount)
             .Map(dest => dest.Currency, src => src.Currency.Code);
    }
  }


}
