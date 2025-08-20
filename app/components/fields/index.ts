import { StringField } from './StringField';
import { ArrayField } from './ArrayField';
import { BooleanField } from './BooleanField';
import { NumberInchesField } from './NumberInchesField';
import { NumberDollarsField } from './NumberDollarsField';
import { VerticalSplitsArrayField } from './VerticalSplitsArrayField';
import { SelectField } from './SelectField';
import { DateField } from './DateField';
import { LongTextField } from './LongTextField';

export const fieldComponentMap: Record<string, any> = {
  string: StringField,
  number: NumberInchesField, // Use NumberInchesField for basic numbers too
  array: ArrayField,
  bool: BooleanField,
  number_inches: NumberInchesField,
  number_dollars: NumberDollarsField,
  vertical_splits_array: VerticalSplitsArrayField,
  array: ArrayField,
  select: SelectField,
  date: DateField,
  longtext: LongTextField
};
