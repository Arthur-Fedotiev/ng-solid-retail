import { InjectionToken } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

export type IdGenerator = () => string;

export const ID_GENERATOR = new InjectionToken<IdGenerator>('IdGenerator', {
  providedIn: 'root',
  factory: () => uuidv4,
});
