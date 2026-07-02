import { Type } from 'typebox';
import Schema from 'typebox/schema';

interface TechnicalInformation {
  agency: string;
  prefix: number;
  rules: {
    rule: {
      /** Differs from `DOCTYPE`. Renaming to `length` is dangerous. */
      len: number;
      /** Differs from `DOCTYPE`. Split into two numbers. */
      range: [number, number];
    }[];
  };
};

interface IsbnRangeMessage {
  isbnRangeMessage: {
    eanUccPrefixes: {
      eanUcc: TechnicalInformation[];
    };
    messageDate: string;
    messageSerialNumber?: string;
    messageSource?: string;
    registrationGroups: {
      group: TechnicalInformation[];
    };
  };
}

const technicalInformationSchema = Type.Object({
  agency: Type.String(),
  prefix: Type.Integer(),
  rules: Type.Object({
    rule: Type.Array(Type.Object({
      /** Differs from `DOCTYPE`. Renaming to `length` is dangerous. */
      len: Type.Integer(),
      /** Differs from `DOCTYPE`. Split into two numbers. */
      range: Type.Tuple([
        Type.Integer(),
        Type.Integer(),
      ]),
    })),
  }),
});

const schema = Type.Object({
  isbnRangeMessage: Type.Object({
    eanUccPrefixes: Type.Object({
      eanUcc: Type.Array(technicalInformationSchema),
    }),
    messageDate: Type.String(),
    messageSerialNumber: Type.Optional(Type.String()),
    messageSource: Type.Optional(Type.String()),
    registrationGroups: Type.Object({
      group: Type.Array(technicalInformationSchema),
    }),
  }),
});

const validator = Schema.Compile(schema);

/** Incompatible with `isolatedDeclarations`. */
/** See <https://v5.chriskrycho.com/notes/isolated-declarations-and-zod/>. */
// export type IsbnRangeMessage = Type.Static<typeof schema>;

function cast(value: unknown): IsbnRangeMessage {
  /** Parse, don't validate. */
  return validator.Parse(value);
}

export {
  cast,
  type IsbnRangeMessage,
  type TechnicalInformation,
};
