using Sr.Api.ProductsCatalogue.Common;

namespace Sr.Api.ProductsCatalogue.Contracts.Common
{
  public abstract class ProductResponse
  {
    public abstract ProductCategory Category { get; }

    public Guid Id { get; init; }
    public string Name { get; init; } = null!;
    public string Description { get; init; } = null!;
    public string SKU { get; init; } = null!;
    public string Url { get; init; } = null!;
    public List<PriceResponse> Prices { get; init; } = null!;

    protected ProductResponse(
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
    ProductTier Tier,
    CurrencyCode Currency
  );

  public class ShoesResponse : ProductResponse
  {
    public override ProductCategory Category => ProductCategory.Shoes;
    public ShoesSpecificationResponse Specifications { get; init; }

    public ShoesResponse(
      Guid id,
      string name,
      string description,
      string sku,
      string url,
      List<PriceResponse> prices,
      ShoesSpecificationResponse specifications
    ) : base(id, name, description, sku, url, prices)
    {
      Specifications = new ShoesSpecificationResponse(
        specifications.Size,
        specifications.Color
      );
    }
  }

  public class ClothingResponse : ProductResponse
  {
    public override ProductCategory Category => ProductCategory.Clothing;
    public ClothingSpecificationResponse Specifications { get; init; }

    public ClothingResponse(
      Guid id,
      string name,
      string description,
      string sku,
      string url,
      List<PriceResponse> prices,
      ClothingSpecificationResponse specifications
    ) : base(id, name, description, sku, url, prices)
    {
      Specifications = new ClothingSpecificationResponse(
        specifications.Size,
        specifications.Color
      );
    }
  }

  public class BookResponse : ProductResponse
  {
    public override ProductCategory Category => ProductCategory.Books;
    public BookSpecificationResponse Specifications { get; init; }

    public BookResponse(
      Guid id,
      string name,
      string description,
      string sku,
      string url,
      List<PriceResponse> prices,
      BookSpecificationResponse specifications
    ) : base(id, name, description, sku, url, prices)
    {
      Specifications = new BookSpecificationResponse(
        specifications.Cover
      );
    }
  }
}
