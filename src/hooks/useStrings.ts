import STRINGS_RU from 'constants/strings/STRINGS_RU';
import STRINGS_EN from 'constants/strings/STRINGS_EN';
import STRINGS_KY from 'constants/strings/STRINGS_KY';
import { useAppSelector } from 'hooks/reduxHooks';
import { StringKeyValueI } from 'types/globalTypes';

type StringsI = {
  RU: StringKeyValueI;
  KY: StringKeyValueI;
  EN: StringKeyValueI;
};
const STRINGS: StringsI = {
  RU: STRINGS_RU,
  EN: STRINGS_EN,
  KY: STRINGS_KY,
};

const useStrings = () => {
  const currentLanguage = useAppSelector((state) => state.user.language);
  return STRINGS[currentLanguage];
};

export default useStrings;
