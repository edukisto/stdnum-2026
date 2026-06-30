import type { Agency } from './agency.ts';
import type { Prefix } from './prefix.ts';
import type { Rules } from './rules.ts';

export interface EanUcc {
  agency: Agency;
  prefix: Prefix;
  rules: Rules;
}
