using FluentResults;
using Sr.Api.ProductsCatalogue.Application.Commands.CreateProduct;
using Sr.Api.ProductsCatalogue.Application.Commands.UpdateProduct;
using Sr.Api.ProductsCatalogue.Application.GetProducts.Queries;
using Sr.Api.ProductsCatalogue.Application.Persistance;
using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;
using Sr.Api.ProductsCatalogue.Domain.Product.Errors;
using Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects;

namespace Sr.Api.ProductsCatalogue.Infrastructure.Repositories
{
  public class InMemoryProductsCatalogueRepository : IProductsCatalogueRepository
  {
    private static readonly List<Product> _products = new(){
        Shoes.Create(
         ProductId.Create(Guid.Parse("38062be0-d2ab-4571-9401-e2d37ff9498b")),
          "Nike Air Max 90",
        "The Nike Air Max 90 stays true to its OG running roots with the iconic Waffle sole, stitched overlays and classic TPU accents. Fresh colours give a modern look while Max Air cushioning adds comfort to your journey.",
        "CZ1929-100",
        new List<ProductPrice>
        {
          ProductPrice.Create(149.99m, ProductTier.FirstTier, Currency.USDollar),
          ProductPrice.Create(129.99m, ProductTier.SecondTier, Currency.USDollar),
          ProductPrice.Create(99.99m, ProductTier.ThirdTier, Currency.USDollar)
        },
        ProductRetailer.Amazon,
        "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/1d4d1b1e-1b1a-4b1a-8b1a-9b1a9b1a9b1a/air-max-90-shoe-9JXzXK.jpg",
        42.5f,
        "White"
        )
    };
    public async Task<Result<Product>> CreateProductAsync(CreateProductCommand product)
    {
      var newProduct = CreateProduct(product);

      if (newProduct.IsSuccess)
      {
        _products.Add(newProduct.Value);
      }

      await Task.CompletedTask;

      return newProduct;
    }

    public static async Task<Result> DeleteProductAsync(Guid id)
    {
      var product = _products.FirstOrDefault(product => product.Id.Value == id);
      await Task.CompletedTask;

      if (product is not null)
      {
        _ = _products.Remove(product);

        return Result.Ok();
      }


      return Result.Fail(DomainErrors.Product.ProductNotFound);
    }

    public async Task<(IReadOnlyList<Product> products, int Count)> GetProductsAsync(GetProductsQuery query)
    {
      var products = _products.AsQueryable();

      if (!string.IsNullOrEmpty(query.Ids))
      {
        var ids = query.Ids.Split(',').Select(Guid.Parse);

        products = products.Where(product => ids.Contains(product.Id.Value));
      }

      var total = products.Count();

      if (query.PageSize is not null && query.PageIndex is not null)
      {
        products = products
          .Skip(query.PageSize.Value * query.PageIndex.Value)
          .Take(query.PageSize.Value);
      }

      var result = products.ToList().AsReadOnly<Product>();

      await Task.CompletedTask;

      return (result, total);
    }

    public async Task<Result<Product>> UpdateProductAsync(UpdateProductCommand request)
    {
      await Task.CompletedTask;

      var product = _products.FirstOrDefault(product => product.Id.Value == request.Id);

      if (product is null)
      {
        return Result.Fail<Product>(DomainErrors.Product.ProductNotFound);
      }

      var updatedProduct = CreateProduct(request);

      _ = _products.Remove(product);
      _products.Add(updatedProduct.Value);

      return updatedProduct;
    }

    private static Result<Product> CreateProduct(CreateProductCommand request)
    {
      return request.Category switch
      {
        ProductCategory.Books => Book.Create(
          ProductId.CreateUnique(),
          request.Name,
          request.Description,
          request.Sku,
          request.Prices.ConvertAll(price => ProductPrice.Create(price.Value, ProductTier.FirstTier, Currency.USDollar)),
          request.Retailer,
          request.Url,
          request.Specifications.AsT2.Cover
          ),
        ProductCategory.Clothing => Clothing.Create(
          ProductId.CreateUnique(),
          request.Name,
          request.Description,
          request.Sku,
          request.Prices.ConvertAll(price => ProductPrice.Create(price.Value, ProductTier.FirstTier, Currency.USDollar)),
          request.Retailer,
          request.Url,
          request.Specifications.AsT1.Size,
          request.Specifications.AsT1.Color
          ),
        ProductCategory.Shoes => Shoes.Create(
          ProductId.CreateUnique(),
          request.Name,
          request.Description,
          request.Sku,
          request.Prices.ConvertAll(price => ProductPrice.Create(price.Value, ProductTier.FirstTier, Currency.USDollar)),
          request.Retailer,
          request.Url,
          request.Specifications.AsT0.Size,
          request.Specifications.AsT0.Color
          ),
        _ => Result.Fail<Product>(DomainErrors.Product.CategoryNotSupported)
      };
    }

    private static Result<Product> CreateProduct(UpdateProductCommand request)
    {
      var id = ProductId.Create(request.Id);
      return request.Category switch
      {
        ProductCategory.Books => Book.Create(
          id,
          request.Name,
          request.Description,
          request.Sku,
          request.Prices.ConvertAll(price => ProductPrice.Create(price.Value, ProductTier.FirstTier, Currency.USDollar)),
                    request.Retailer,
          request.Url,

          request.Specifications.AsT2.Cover
          ),
        ProductCategory.Clothing => Clothing.Create(
          id,
          request.Name,
          request.Description,
          request.Sku,
          request.Prices.ConvertAll(price => ProductPrice.Create(price.Value, ProductTier.FirstTier, Currency.USDollar)),
          request.Retailer,
          request.Url,
          request.Specifications.AsT1.Size,
          request.Specifications.AsT1.Color
          ),
        ProductCategory.Shoes => Shoes.Create(
          id,
          request.Name,
          request.Description,
          request.Sku,
          request.Prices.ConvertAll(price => ProductPrice.Create(price.Value, ProductTier.FirstTier, Currency.USDollar)),
          request.Retailer,
          request.Url,
          request.Specifications.AsT0.Size,
          request.Specifications.AsT0.Color
          ),
        _ => Result.Fail<Product>(DomainErrors.Product.CategoryNotSupported)
      };
    }

    Task<Result> IProductsCatalogueRepository.DeleteProductAsync(Guid id)
    {
      throw new NotImplementedException();
    }
  }
}
