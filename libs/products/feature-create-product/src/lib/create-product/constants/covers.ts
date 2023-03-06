export enum CoverType {
  Hard = 'Hard',
  Soft = 'Soft',
}

export const HardCover = {
  type: CoverType.Hard,
  label: 'Hard',
} as const;

export const SoftCover = {
  type: CoverType.Soft,
  label: 'Soft',
} as const;

export const Covers = [HardCover, SoftCover] as const;

export type Cover = typeof Covers[number];
