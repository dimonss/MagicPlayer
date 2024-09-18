import { BUILD_TYPE, LANGUAGE, PATH_TO_IMAGE } from 'constants/globalConstants';
import { NullableString } from 'types/globalTypes';

export const getFullPathToImg = (img: string) =>
  process.env.REACT_APP_BUILD_TYPE === BUILD_TYPE.LOCAL
    ? `http://localhost/api/${PATH_TO_IMAGE}${img}`
    : (process.env.REACT_APP_BASE_API_URL || '') + PATH_TO_IMAGE + img;

export const getLanguageConstant = (lang: NullableString): LANGUAGE => {
  switch (lang) {
    case LANGUAGE.RU:
      return LANGUAGE.RU;
    case LANGUAGE.EN:
      return LANGUAGE.EN;
    case LANGUAGE.KY:
      return LANGUAGE.KY;
    default:
      return LANGUAGE.RU;
  }
};
