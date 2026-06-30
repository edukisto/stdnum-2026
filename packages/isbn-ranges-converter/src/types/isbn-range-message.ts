import type { EanUccPrefixes } from './ean-ucc-prefixes.ts';
import type { MessageDate } from './message-date.ts';
import type { MessageSerialNumber } from './message-serial-number.ts';
import type { MessageSource } from './message-source.ts';
import type { RegistrationGroups } from './registration-groups.ts';

export interface IsbnRangeMessage {
  eanUccPrefixes: EanUccPrefixes;
  messageDate: MessageDate;
  messageSerialNumber?: MessageSerialNumber;
  messageSource?: MessageSource;
  registrationGroups: RegistrationGroups;
}
