using Mapster;
using Sr.Api.ProductsCatalogue.Contracts.CreateProduct;
using Price = Sr.Api.ProductsCatalogue.Application.CreateProduct.Price;
using CommonContracts = Sr.Api.ProductsCatalogue.Contracts.Common;
using Sr.Api.ProductsCatalogue.Application.CreateProduct;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;

namespace Sr.SolidRetailApi.Common.Mapping
{
  public class MappingConfig : IRegister
  {
    public void Register(TypeAdapterConfig config)
    {
      _ = config.NewConfig<CreateShoesRequest, CreateProductCommand>()
            .Map(dest => dest.Category, src => src.Category)
            .Map(dest => dest.Name, src => src.Name)
            .Map(dest => dest.Description, src => src.Description)
            .Map(dest => dest.SKU, src => src.SKU)
            .Map(dest => dest.Url, src => src.Url)
            .Map(dest => dest.Prices, src => src.Prices.ConvertAll(price => new Price(price.Value, price.Currency)))
            .Map(dest => dest.Specifications,
                  src => new ShoesSpecification(src.Specifications.Size, src.Specifications.Color));

      _ = config.NewConfig<CreateClothingRequest, CreateProductCommand>()
            .Map(dest => dest.Category, src => src.Category)
            .Map(dest => dest.Name, src => src.Name)
            .Map(dest => dest.Description, src => src.Description)
            .Map(dest => dest.SKU, src => src.SKU)
            .Map(dest => dest.Url, src => src.Url)
            .Map(dest => dest.Prices, src => src.Prices.ConvertAll(price => new Price(price.Value, price.Currency)))
            .Map(dest => dest.Specifications,
                  src => new ClothingSpecification(src.Specifications.Size, src.Specifications.Color));

      _ = config.NewConfig<CreateBookRequest, CreateProductCommand>()
            .Map(dest => dest.Category, src => src.Category)
            .Map(dest => dest.Name, src => src.Name)
            .Map(dest => dest.Description, src => src.Description)
            .Map(dest => dest.SKU, src => src.SKU)
            .Map(dest => dest.Url, src => src.Url)
            .Map(dest => dest.Prices, src => src.Prices.ConvertAll(price => new Price(price.Value, price.Currency)))
            .Map(dest => dest.Specifications,
                  src => new BookSpecification(src.Specifications.Cover));

      _ = config.NewConfig<Shoes, CreateShoesResponse>()
            .ConstructUsing(src => new CreateShoesResponse(
              src.Id.Value,
              src.Name,
              src.Description,
              src.SKU,
              src.Url,
              src.Prices.ToList().ConvertAll(price => new PriceResponse(price.Amount, price.Currency.Code)),
              new CommonContracts.ShoesSpecification(src.ShoesSize, src.Color)))
            .Map(dest => dest.Id, src => src.Id.Value)
            .Map(dest => dest.Name, src => src.Name)
            .Map(dest => dest.Description, src => src.Description)
            .Map(dest => dest.SKU, src => src.SKU)
            .Map(dest => dest.Url, src => src.Url)
            .Map(dest => dest.Prices, src => src.Prices.ToList().ConvertAll(price => new PriceResponse(price.Amount, price.Currency.Code)))
            .Map(dest => dest, src => new CommonContracts.ShoesSpecification(src.ShoesSize, src.Color));

      _ = config.NewConfig<Clothing, CreateClothingResponse>()
            .ConstructUsing(src => new CreateClothingResponse(
              src.Id.Value,
              src.Name,
              src.Description,
              src.SKU,
              src.Url,
              src.Prices.ToList().ConvertAll(price => new PriceResponse(price.Amount, price.Currency.Code)),
              new CommonContracts.ClothingSpecification(src.ClothingSize, src.Color)))
            .Map(dest => dest.Id, src => src.Id.Value)
            .Map(dest => dest.Name, src => src.Name)
            .Map(dest => dest.Description, src => src.Description)
            .Map(dest => dest.SKU, src => src.SKU)
            .Map(dest => dest.Url, src => src.Url)
            .Map(dest => dest.Prices, src => src.Prices.ToList().ConvertAll(price => new PriceResponse(price.Amount, price.Currency.Code)))
            .Map(dest => dest, src => new CommonContracts.ClothingSpecification(src.ClothingSize, src.Color));

      _ = config.NewConfig<Book, CreateBookResponse>()
            .ConstructUsing(src => new CreateBookResponse(
              src.Id.Value,
              src.Name,
              src.Description,
              src.SKU,
              src.Url,
              src.Prices.ToList().ConvertAll(price => new PriceResponse(price.Amount, price.Currency.Code)),
              new CommonContracts.BookSpecification(src.Cover)))
            .Map(dest => dest.Id, src => src.Id.Value)
            .Map(dest => dest.Name, src => src.Name)
            .Map(dest => dest.Description, src => src.Description)
            .Map(dest => dest.SKU, src => src.SKU)
            .Map(dest => dest.Url, src => src.Url)
            .Map(dest => dest.Prices, src => src.Prices.ToList().ConvertAll(price => new PriceResponse(price.Amount, price.Currency.Code)))
            .Map(dest => dest, src => new CommonContracts.BookSpecification(src.Cover));
    }
  }
}
