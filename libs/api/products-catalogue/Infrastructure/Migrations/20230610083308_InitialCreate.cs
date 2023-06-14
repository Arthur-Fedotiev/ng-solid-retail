using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Sr.Api.ProductsCatalogue.Infrastructure.Migrations
{
  /// <inheritdoc />
  public partial class InitialCreate : Migration
  {
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.CreateTable(
          name: "Products",
          columns: table => new
          {
            Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            Category = table.Column<int>(type: "int", nullable: false),
            Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
            Description = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: false),
            Sku = table.Column<string>(type: "nvarchar(max)", nullable: false),
            Url = table.Column<string>(type: "nvarchar(max)", nullable: false),
            Retailer = table.Column<int>(type: "int", nullable: false),
            Cover = table.Column<string>(type: "nvarchar(max)", nullable: true),
            ClothingSize = table.Column<string>(type: "nvarchar(max)", nullable: true),
            Color = table.Column<string>(type: "nvarchar(max)", nullable: true),
            ShoesSize = table.Column<float>(type: "real", nullable: true),
            Shoes_Color = table.Column<string>(type: "nvarchar(max)", nullable: true)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Products", x => x.Id);
          });

      migrationBuilder.CreateTable(
          name: "ProductPrice",
          columns: table => new
          {
            ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            Id = table.Column<int>(type: "int", nullable: false),
            Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
            Currency_Code = table.Column<int>(type: "int", nullable: false),
            Currency_Symbol = table.Column<string>(type: "nvarchar(max)", nullable: false),
            Tier = table.Column<int>(type: "int", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_ProductPrice", x => new { x.ProductId, x.Id });
            table.ForeignKey(
                      name: "FK_ProductPrice_Products_ProductId",
                      column: x => x.ProductId,
                      principalTable: "Products",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Cascade);
          });
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
          name: "ProductPrice");

      migrationBuilder.DropTable(
          name: "Products");
    }
  }
}
