using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Contracts.Common;

namespace Sr.Api.ProductsCatalogue.Contracts.CreateProduct
{
  public abstract class CreateProductResponse
  {
    public abstract ProductCategory Category { get; }

    public Guid Id { get; init; }
    public string Name { get; init; } = null!;
    public string Description { get; init; } = null!;
    public string SKU { get; init; } = null!;
    public string Url { get; init; } = null!;
    public List<PriceResponse> Prices { get; init; } = null!;

    protected CreateProductResponse(
      Guid id,
      string name,
      string description,
      string sku,
      string url,
      List<PriceResponse> prices
    )
    {
      Id = id;
      Name = name;
      Description = description;
      SKU = sku;
      Url = url;
      Prices = prices;
    }
  }

  public record PriceResponse(
    decimal Value,
    string Currency
  );

  public class CreateShoesResponse : CreateProductResponse
  {
    public override ProductCategory Category => ProductCategory.Shoes;
    public ShoesSpecification Specifications { get; init; }

    public CreateShoesResponse(
      Guid id,
      string name,
      string description,
      string sku,
      string url,
      List<PriceResponse> prices,
      ShoesSpecification specifications
    ) : base(id, name, description, sku, url, prices)
    {
      Specifications = new ShoesSpecification(
        specifications.Size,
        specifications.Color
      );
    }
  }

  public class CreateClothingResponse : CreateProductResponse
  {
    public override ProductCategory Category => ProductCategory.Clothing;
    public ClothingSpecification Specifications { get; init; }

    public CreateClothingResponse(
      Guid id,
      string name,
      string description,
      string sku,
      string url,
      List<PriceResponse> prices,
      ClothingSpecification specifications
    ) : base(id, name, description, sku, url, prices)
    {
      Specifications = new ClothingSpecification(
        specifications.Size,
        specifications.Color
      );
    }
  }

  public class CreateBookResponse : CreateProductResponse
  {
    public override ProductCategory Category => ProductCategory.Books;
    public BookSpecification Specifications { get; init; }

    public CreateBookResponse(
      Guid id,
      string name,
      string description,
      string sku,
      string url,
      List<PriceResponse> prices,
      BookSpecification specifications
    ) : base(id, name, description, sku, url, prices)
    {
      Specifications = new BookSpecification(
        specifications.Cover
      );
    }
  }
}
