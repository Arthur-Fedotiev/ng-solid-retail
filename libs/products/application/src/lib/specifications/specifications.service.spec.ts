import { SpecificationsDataService } from './specifications.service';
import { CategoryEnum } from '../constants/category.enum';
describe('SpecificationsDataService', () => {
  it('should return colors for shoes', () => {
    const { service } = setup();
    expect(service.getColors(CategoryEnum.Shoes)).toMatchInlineSnapshot(`
      [
        "Black",
        "White",
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Orange",
      ]
    `);
  });

  it('should return colors for clothing', () => {
    const { service } = setup();

    expect(service.getColors(CategoryEnum.Clothing)).toMatchInlineSnapshot(`
      [
        "Black",
        "White",
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Orange",
      ]
    `);
  });

  it('should return colors for smartphones', () => {
    const { service } = setup();

    expect(service.getColors(CategoryEnum.Smartphones)).toMatchInlineSnapshot(`
      [
        "Silver",
        "Space Gray",
        "Gold",
        "Rose Gold",
        "Midnight Green",
        "Pacific Blue",
        "Graphite",
        "White",
        "Black",
      ]
    `);
  });

  it('should return colors for furniture', () => {
    const { service } = setup();

    expect(service.getColors(CategoryEnum.Furniture)).toMatchInlineSnapshot(`
      [
        "Natural",
        "Cherry",
        "Walnut",
        "Maple",
        "Oak",
        "Mahogany",
        "Ebony",
        "Teak",
        "Birch",
        "Ash",
        "Pine",
        "Beech",
        "Cedar",
        "Rosewood",
      ]
    `);
  });

  it('should return sizes for shoes', () => {
    const { service } = setup();

    expect(service.getSizes(CategoryEnum.Shoes)).toMatchInlineSnapshot(`
      [
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
      ]
    `);
  });

  it('should return sizes for clothing', () => {
    const { service } = setup();

    expect(service.getSizes(CategoryEnum.Clothing)).toMatchInlineSnapshot(`
      [
        "XXS",
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL",
      ]
    `);
  });

  it('should return cover types', () => {
    const { service } = setup();

    expect(service.getCoverTypes()).toMatchInlineSnapshot(`
      [
        "Hardcover",
        "Paperback",
        "Kindle",
      ]
    `);
  });

  function setup() {
    const service = new SpecificationsDataService();
    return { service };
  }
});
