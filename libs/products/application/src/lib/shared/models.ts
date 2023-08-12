import { Categories, Colors, Retailers, Tiers } from './constants';

export type CategoriesMap = typeof Categories;
export type Category = typeof Categories[keyof typeof Categories];

export type RetailersMap = typeof Retailers;
export type TiersMap = typeof Tiers;
export type ColorsMap = typeof Colors;
