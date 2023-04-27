using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Contracts.Common;

namespace Sr.Api.ProductsCatalogue.Contracts.CreateProduct
{
  public abstract class CreateProductRequest
  {
    public string Name { get; init; } = null!;
    public string Description { get; init; } = null!;
    public string SKU { get; init; } = null!;
    public string Url { get; init; } = null!;
    public ProductCategory Category { get; init; }
    public List<Price> Prices { get; init; } = null!;

    protected CreateProductRequest(
      string name,
      string description,
      string sku,
      string url,
      ProductCategory category,
      List<Price> prices
    )
    {
      Name = name;
      Description = description;
      SKU = sku;
      Url = url;
      Category = category;
      Prices = prices;
    }
  }

  public sealed class CreateShoesRequest : CreateProductRequest
  {
    public ShoesSpecification Specifications { get; init; }

    public CreateShoesRequest(
      string name,
      string description,
      string sku,
      string url,
      List<Price> prices,
      ShoesSpecification specifications
    ) : base(name, description, sku, url, ProductCategory.Shoes, prices)
    {
      Specifications = new ShoesSpecification(
        specifications.Size,
        specifications.Color
      );
    }
  }

  public sealed class CreateClothingRequest : CreateProductRequest
  {
    public ClothingSpecification Specifications { get; init; }

    public CreateClothingRequest(
      string name,
      string description,
      string sku,
      string url,
      List<Price> prices,
      ClothingSpecification specifications
    ) : base(name, description, sku, url, ProductCategory.Clothing, prices)
    {
      Specifications = new ClothingSpecification(
        specifications.Size,
        specifications.Color
      );
    }
  }

  public sealed class CreateBookRequest : CreateProductRequest
  {
    public BookSpecification Specifications { get; init; }

    public CreateBookRequest(
      string name,
      string description,
      string sku,
      string url,
      List<Price> prices,
      BookSpecification specifications
    ) : base(name, description, sku, url, ProductCategory.Books, prices)
    {
      Specifications = new BookSpecification(
        specifications.Cover
      );
    }
  }

  public record Price(
    decimal Value,
    string Currency
  );
}
