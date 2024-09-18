import { NullableNumber, NullableString } from 'types/globalTypes';

export type Example = {
  id: number;
  categoryId: NullableNumber;
  title: NullableString;
};
