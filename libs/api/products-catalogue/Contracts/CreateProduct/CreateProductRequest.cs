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
    public ProductRetailer Retailer { get; init; }

    protected CreateProductRequest(
      string name,
      string description,
      string sku,
      string url,
      ProductCategory category,
      ProductRetailer retailer,
      List<Price> prices
    )
    {
      Name = name;
      Description = description;
      SKU = sku;
      Url = url;
      Category = category;
      Prices = prices;
      Retailer = retailer;
    }
  }

  public sealed class CreateShoesRequest : CreateProductRequest
  {
    public ShoesSpecificationRequest Specifications { get; init; }

    public CreateShoesRequest(
      string name,
      string description,
      string sku,
      string url,
      ProductRetailer retailer,
      List<Price> prices,
      ShoesSpecificationRequest specifications
    ) : base(name, description, sku, url, ProductCategory.Shoes, retailer, prices)
    {
      Specifications = new ShoesSpecificationRequest(
        specifications.Size,
        specifications.Color
      );
    }
  }

  public sealed class CreateClothingRequest : CreateProductRequest
  {
    public ClothingSpecificationRequest Specifications { get; init; }

    public CreateClothingRequest(
      string name,
      string description,
      string sku,
      string url,
      ProductRetailer retailer,
      List<Price> prices,
      ClothingSpecificationRequest specifications
    ) : base(name, description, sku, url, ProductCategory.Clothing, retailer, prices)
    {
      Specifications = new ClothingSpecificationRequest(
        specifications.Size,
        specifications.Color
      );
    }
  }

  public sealed class CreateBookRequest : CreateProductRequest
  {
    public BookSpecificationRequest Specifications { get; init; }

    public CreateBookRequest(
      string name,
      string description,
      string sku,
      string url,
      ProductRetailer retailer,
      List<Price> prices,
      BookSpecificationRequest specifications
    ) : base(name, description, sku, url, ProductCategory.Books, retailer, prices)
    {
      Specifications = new BookSpecificationRequest(
        specifications.Cover
      );
    }
  }

  public record Price(
    decimal Value,
    ProductTier Tier,
    CurrencyCode Currency
  );
}
