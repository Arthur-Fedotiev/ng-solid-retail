using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Contracts.Common;

namespace Sr.Api.ProductsCatalogue.Contracts.UpdateProduct
{
  public abstract class UpdateProductRequest
  {
    public Guid Id { get; init; }
    public string Name { get; init; } = null!;
    public string Description { get; init; } = null!;
    public string SKU { get; init; } = null!;
    public ProductRetailer Retailer { get; init; }
    public string Url { get; init; } = null!;
    public ProductCategory Category { get; init; }
    public List<Price> Prices { get; init; } = null!;

    protected UpdateProductRequest(
      Guid id,
      string name,
      string description,
      string sku,
      ProductRetailer retailer,
      string url,
      ProductCategory category,
      List<Price> prices
    )
    {
      Id = id;
      Name = name;
      Description = description;
      SKU = sku;
      Retailer = retailer;
      Url = url;
      Category = category;
      Prices = prices;
    }
  }

  public sealed class UpdateShoesRequest : UpdateProductRequest
  {
    public ShoesSpecificationRequest Specifications { get; init; }

    public UpdateShoesRequest(
      Guid id,
      string name,
      string description,
      string sku,
      ProductRetailer retailer,
      string url,
      List<Price> prices,
      ShoesSpecificationRequest specifications
    ) : base(id, name, description, sku, retailer, url, ProductCategory.Shoes, prices)
    {
      Specifications = new ShoesSpecificationRequest(
        specifications.Size,
        specifications.Color
      );
    }
  }

  public sealed class UpdateClothingRequest : UpdateProductRequest
  {
    public ClothingSpecificationRequest Specifications { get; init; }

    public UpdateClothingRequest(
      Guid id,
      string name,
      string description,
      string sku,
      ProductRetailer retailer,
      string url,
      List<Price> prices,
      ClothingSpecificationRequest specifications
    ) : base(id, name, description, sku, retailer, url, ProductCategory.Clothing, prices)
    {
      Specifications = new ClothingSpecificationRequest(
        specifications.Size,
        specifications.Color
      );
    }
  }

  public sealed class UpdateBookRequest : UpdateProductRequest
  {
    public BookSpecificationRequest Specifications { get; init; }

    public UpdateBookRequest(
      Guid id,
      string name,
      string description,
      string sku,
      ProductRetailer retailer,
      string url,
      List<Price> prices,
      BookSpecificationRequest specifications
    ) : base(id, name, description, sku, retailer, url, ProductCategory.Books, prices)
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
