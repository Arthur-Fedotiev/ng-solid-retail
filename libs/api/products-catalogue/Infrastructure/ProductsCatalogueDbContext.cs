using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;

namespace Sr.Api.ProductsCatalogue.Infrastructure
{
  public class ProductsCatalogueDbContext : DbContext
  {
    public ProductsCatalogueDbContext(DbContextOptions<ProductsCatalogueDbContext> options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; } = null!;
    public DbSet<Shoes> Shoes { get; set; } = null!;
    public DbSet<Clothing> Clothing { get; set; } = null!;
    public DbSet<Book> Book { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      _ = modelBuilder.ApplyConfigurationsFromAssembly(typeof(ProductsCatalogueDbContext).Assembly);

      modelBuilder.Model.GetEntityTypes()
          .SelectMany(e => e.GetProperties())
          .ToList()
          .ForEach(e => e.ValueGenerated = ValueGenerated.Never);

      base.OnModelCreating(modelBuilder);
    }

  }
}
