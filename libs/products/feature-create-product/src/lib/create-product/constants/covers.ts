import { CoverType } from "@sr/products/application";

export const HardCover = {
  type: "Hardcover",
  label: 'Hard',
} satisfies {
  type: CoverType,
  label: string,
};

export const SoftCover = {
  type: "Paperback",
  label: 'Soft',
} satisfies {
  type: CoverType,
  label: string,
};

export const Kindle = {
  type: "Kindle",
  label: 'Kindle',
} satisfies {
  type: CoverType,
  label: string,
};

export const Covers = [HardCover, SoftCover] as const;
export type Cover = typeof Covers[number];
