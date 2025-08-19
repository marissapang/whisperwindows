import { NumberDollarsField } from './NumberDollarsField';
import { NumberInchesField } from './NumberInchesField';
import { StringField } from './StringField';
import { BooleanField } from './BooleanField';
import { ArrayField } from './ArrayField';
import { SelectField } from './SelectField';
import { DateField } from './DateField';
import { LongTextField } from './LongTextField';

export const fieldComponentMap: Record<string, React.ComponentType<any>> = {
  number_dollars: NumberDollarsField,
  string: StringField,
  bool: BooleanField,
  number_inches: NumberInchesField,
  array: ArrayField,
  select: SelectField,
  date: DateField,
  longtext: LongTextField
};

