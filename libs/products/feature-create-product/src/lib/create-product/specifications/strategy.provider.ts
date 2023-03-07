import {
  SpecificationsFormGroupStrategy,
  BooksSpecificationsFormGroupStrategy,
  ShoesSpecificationsFormGroupStrategy,
  ClothingSpecificationsFormGroupStrategy,
  SmartphonesSpecificationsFormGroupStrategy,
  FurnitureSpecificationsFormGroupStrategy,
  NullSpecificationsFormGroupStrategy,
} from './strategies';

export const STRATEGY_PROVIDERS = [
  {
    provide: SpecificationsFormGroupStrategy,
    useClass: BooksSpecificationsFormGroupStrategy,
    multi: true,
  },
  {
    provide: SpecificationsFormGroupStrategy,
    useClass: ShoesSpecificationsFormGroupStrategy,
    multi: true,
  },

  {
    provide: SpecificationsFormGroupStrategy,
    useClass: ClothingSpecificationsFormGroupStrategy,
    multi: true,
  },
  {
    provide: SpecificationsFormGroupStrategy,
    useClass: SmartphonesSpecificationsFormGroupStrategy,
    multi: true,
  },
  {
    provide: SpecificationsFormGroupStrategy,
    useClass: FurnitureSpecificationsFormGroupStrategy,
    multi: true,
  },
  {
    provide: SpecificationsFormGroupStrategy,
    useClass: NullSpecificationsFormGroupStrategy,
    multi: true,
  },
];
