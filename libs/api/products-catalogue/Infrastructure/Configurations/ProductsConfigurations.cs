using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;
using Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects;

namespace Sr.Api.ProductsCatalogue.Infrastructure.Configurations
{
  public class ProductsConfigurations : IEntityTypeConfiguration<Product>
  {
    public void Configure(EntityTypeBuilder<Product> builder)
    {
      ConfigureProductTable(builder);
    }

    private static void ConfigureProductTable(EntityTypeBuilder<Product> builder)
    {
      _ = builder.ToTable("Products");

      _ = builder.UseTphMappingStrategy();

      _ = builder.HasDiscriminator(product => product.Category)
        .HasValue<Shoes>(ProductCategory.Shoes)
        .HasValue<Clothing>(ProductCategory.Clothing)
        .HasValue<Book>(ProductCategory.Books);

      _ = builder.HasKey(product => product.Id);
      _ = builder.Property(product => product.Id)
        .HasConversion(id => id.Value, id => ProductId.Create(id));

      _ = builder.Property(product => product.Name).HasMaxLength(150).IsRequired();
      _ = builder.Property(product => product.Description).HasMaxLength(5000).IsRequired();
      _ = builder.Property(product => product.Sku).IsRequired();
      _ = builder.Property(product => product.Url).IsRequired();
      _ = builder.Property(product => product.Category).IsRequired();

      _ = builder.Property(product => product.Retailer).IsRequired();

      _ = builder.OwnsMany(product => product.Prices, pb =>
      {

        _ = pb.OwnsOne(price => price.Currency, cb =>
        {
          _ = cb.Property(currency => currency.Code).IsRequired();
          _ = cb.Property(currency => currency.Symbol).IsRequired();
        });
      });


    }
  }
}
