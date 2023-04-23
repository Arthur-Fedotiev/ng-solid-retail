using System.ComponentModel;

namespace Sr.Api.ProductsCatalogue.Contracts.Common
{
  public enum Category
  {
    [Description("Alcohol Drinks")]
    AlcoholDrinks = 1,
    NonAlcoholDrinks = 2,
    Food = 3,
    Electronics = 4,
    Computers = 5,
    Tablets = 6,
    Smartphones = 7,
    Laptops = 8,
    OtherElectronics = 9,
    Books = 10,
    Movies = 11,
    Magazine = 12,
    Furniture = 13,
    OtherFurniture = 14,
    Other = 15,
    Appliances = 16,
    Medicine = 17,
    Clothing = 18,
    Shoes = 19,
    Accessories = 20,
  }
}
