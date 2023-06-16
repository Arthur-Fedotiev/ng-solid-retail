using FluentResults;
using Microsoft.EntityFrameworkCore;
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

      _ = _dbContext.Products.Add(productEntity.Value);

      _ = await _dbContext.SaveChangesAsync();

      return Result.Ok(productEntity.Value);
    }

    public async Task<Result> DeleteProductAsync(Guid id)
    {
      var product = await _dbContext.Book
          .FirstOrDefaultAsync(p => p.Id == ProductId.Create(id));


      if (product is null)
      {
        return Result.Fail(DomainErrors.Product.ProductNotFound);
      }

      _ = _dbContext.Products.Remove(product);
      _ = await _dbContext.SaveChangesAsync();

      return Result.Ok();
    }

    public async Task<Result<Product>> GetProductAsync(Guid id)
    {
      var product = await _dbContext.Book
        .FirstOrDefaultAsync(p => p.Id == ProductId.Create(id));

      return product is null ? Result.Fail<Product>(DomainErrors.Product.ProductNotFound) : Result.Ok(product as Product);
    }

    public async Task<Result<(IReadOnlyList<Product> products, int count)>> GetProductsAsync(GetProductsQuery query)
    {
      IQueryable<Product> productsQuery = _dbContext.Products.OrderBy(p => p.Name);
      int? count = null;

      if (query.categories is not null)
      {
        var serializedCategories = query.categories.Split(',');

        if (serializedCategories.Any(c => !Enum.TryParse<ProductCategory>(c, out _)))
        {
          return Result.Fail(DomainErrors.Product.CategoryNotSupported);
        }

        var categories = serializedCategories.Select(Enum.Parse<ProductCategory>);

        productsQuery = productsQuery.Where(p => categories.Contains(p.Category));
      }

      if (query.Ids is not null)
      {
        var ids = query.Ids.Split(',').Select(id => ProductId.Create(Guid.Parse(id)));

        productsQuery = productsQuery.Where(p => ids.Contains(p.Id));
      }

      if (query.PageSize.HasValue || query.PageIndex.HasValue)
      {
        productsQuery = productsQuery
          .Skip(query.PageSize.Value * query.PageIndex.Value)
          .Take(query.PageSize.Value * (query.PageIndex.Value + 1));

        count = await _dbContext.Products.CountAsync();
      }

      var products = await productsQuery.ToListAsync();

      count ??= products.Count;

      return (products, (int)count);
    }

    public async Task<Result<Product>> UpdateProductAsync(UpdateProductCommand request)
    {
      var isNewlyCreated = !await _dbContext.Products.AnyAsync(p => p.Id == ProductId.Create(request.Id));
      var product = CreateProduct(request).Value;

      _ = isNewlyCreated ? _dbContext.Products.Add(product) : _dbContext.Products.Update(product);

      _ = await _dbContext.SaveChangesAsync();

      return Result.Ok(product);

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
  }
}
