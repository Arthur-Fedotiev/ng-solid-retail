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
  public class SqlServerProductsRepository : IProductsCatalogueRepository
  {
    private readonly ProductsCatalogueDbContext _dbContext;

    public SqlServerProductsRepository(ProductsCatalogueDbContext dbContext)
    {
      _dbContext = dbContext;
    }

    public async Task<Result<Product>> CreateProductAsync(CreateProductCommand product)
    {
      var productEntity = CreateProduct(product);

      if (productEntity.IsFailed)
      {
        return Result.Fail<Product>(productEntity.Errors);
      }

      _dbContext.Products.Add(productEntity.Value);

      await _dbContext.SaveChangesAsync();

      return Result.Ok(productEntity.Value);
    }

    public Task<Product?> DeleteProductAsync(Guid id)
    {
      // var product = await _dbContext.Products.FirstOrDefaultAsync(product => product.Id.Value == id);

      // if (product is not null)
      // {
      //   _ = _dbContext.Products.Remove(product);
      //   await _dbContext.SaveChangesAsync();
      // }

      // return product;
      throw new NotImplementedException();
    }

    public async Task<Result<Product>> GetProductAsync(Guid id)
    {
      // var product = await _dbContext.Products.FirstOrDefaultAsync(product => product.Id.Value == id);

      // if (product is null)
      // {
      //   return Result.Fail<Product>(new ProductNotFound());
      // }

      // return Result.Ok(product);
      throw new NotImplementedException();

    }

    public async Task<(IReadOnlyList<Product> products, int Count)> GetProductsAsync(GetProductsQuery query)
    {
      // var products = await _dbContext.Products
      //   .Skip(query.PageNumber * query.PageSize)
      //   .Take(query.PageSize)
      //   .ToListAsync();

      // return Result.Ok(products);
      throw new NotImplementedException();

    }

    public async Task<Result<Product>> UpdateProductAsync(UpdateProductCommand product)
    {
      throw new NotImplementedException();

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
          ProductRetailerId.Create(request.RetailerId),
          request.Url,
          request.Specifications.AsT2.Cover
          ),
        ProductCategory.Clothing => Clothing.Create(
          ProductId.CreateUnique(),
          request.Name,
          request.Description,
          request.Sku,
          request.Prices.ConvertAll(price => ProductPrice.Create(price.Value, ProductTier.FirstTier, Currency.USDollar)),
          ProductRetailerId.Create(request.RetailerId),
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
          ProductRetailerId.Create(request.RetailerId),
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
                    ProductRetailerId.Create(request.RetailerId),
          request.Url,

          request.Specifications.AsT2.Cover
          ),
        ProductCategory.Clothing => Clothing.Create(
          id,
          request.Name,
          request.Description,
          request.Sku,
          request.Prices.ConvertAll(price => ProductPrice.Create(price.Value, ProductTier.FirstTier, Currency.USDollar)),
          ProductRetailerId.Create(request.RetailerId),
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
          ProductRetailerId.Create(request.RetailerId),
          request.Url,
          request.Specifications.AsT0.Size,
          request.Specifications.AsT0.Color
          ),
        _ => Result.Fail<Product>(DomainErrors.Product.CategoryNotSupported)
      };
    }
  }

}
