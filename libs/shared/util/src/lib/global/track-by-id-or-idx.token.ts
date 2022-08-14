import { InjectionToken } from '@angular/core';
import { WithId } from '../..';

const trackByIdOrIdxFactory: () => TrackByIdOrIdx =
  () =>
  (idx: number, { id }: Partial<WithId<unknown>> = {}) =>
    id ?? idx;

export interface TrackByIdOrIdx {
  (idx: number, item: WithId<unknown>): string | number;
}

export const TRACK_BY_ID_OR_IDX = new InjectionToken<TrackByIdOrIdx>(
  'TrackByIdOrIdx',
  {
    providedIn: 'root',
    factory: trackByIdOrIdxFactory,
  }
);
