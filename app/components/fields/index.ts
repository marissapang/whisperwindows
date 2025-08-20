import { StringField } from './StringField';
import { ArrayField } from './ArrayField';
import { BooleanField } from './BooleanField';
import { NumberInchesField } from './NumberInchesField';
import { NumberDollarsField } from './NumberDollarsField';
import { VerticalSplitsArrayField } from './VerticalSplitsArrayField';

export const fieldComponentMap: Record<string, any> = {
  string: StringField,
  number: NumberInchesField, // Use NumberInchesField for basic numbers too
  array: ArrayField,
  bool: BooleanField,
  number_inches: NumberInchesField,
  number_dollars: NumberDollarsField,
  vertical_splits_array: VerticalSplitsArrayField,
};
