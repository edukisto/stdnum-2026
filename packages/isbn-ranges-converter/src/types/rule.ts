import type { Length } from './length.ts';
import type { Range } from './range.ts';

export interface Rule {
  length: Length;
  range: Range;
}
