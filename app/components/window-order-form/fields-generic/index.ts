import { StringField } from './StringField';
import { WindowObjectArrayContainer } from '../WindowObjectArrayContainer';
import { BooleanField } from './BooleanField';
import { NumberInchesField } from './NumberInchesField';
import { NumberDollarsField } from './NumberDollarsField';
import { VerticalSplitsArrayField } from './VerticalSplitsArrayField';
import { HorizontalSubsectionsArrayField } from './HorizontalSubsectionsArrayField';
// import { ExtensionConfigField } from './ExtensionConfigField';
import { SelectField } from './SelectField';
import { DateField } from './DateField';
import { LongTextField } from './LongTextField';

export const fieldComponentMap: Record<string, any> = {
  string: StringField,
  window_object_array: WindowObjectArrayContainer,
  bool: BooleanField,
  number: NumberInchesField, // Use NumberInchesField for basic numbers too
  integer: NumberInchesField,
  number_inches: NumberInchesField,
  number_dollars: NumberDollarsField,
  vertical_splits_array: VerticalSplitsArrayField,
  horizontal_subsections_array: HorizontalSubsectionsArrayField,
  // extension_config: ExtensionConfigField,
  select: SelectField,
  date: DateField,
  longtext: LongTextField
};
