import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EXAMPLE } from 'API/endpoints';
import { BaseResponseI } from 'types/DTOTypes';
import { Example } from 'models/Example';
import { StringKeyValueI } from 'types/globalTypes';

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const TAG: StringKeyValueI = {
  BONUS_COUNTER: 'EXAMPLE',
};

export const contentApi = createApi({
  reducerPath: 'contentApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) =>
      // headers.set('Authorization', store.getState().user.token);//TODO add auth
      headers,
    responseHandler: (response: Response): Promise<BaseResponseI<any>> => {
      if (response.status === 401) {
        console.log('401');
      }
      return response.json();
    },
  }),
  tagTypes: [TAG.CATEGORY],
  endpoints: (build) => ({
    // EXAMPLE/////////////////////////////////////////////////////////////////////////////////////////////////////////
    fetchBonusCounter: build.query<BaseResponseI<Example[]>, string>({
      query: () => ({ url: EXAMPLE }),
      providesTags: [TAG.EXAMPLE],
    }),
  }),
});
