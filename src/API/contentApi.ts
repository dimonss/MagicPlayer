import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CLIENT } from 'API/endpoints';
import { BaseResponseI } from 'types/DTOTypes';
import { clientI } from 'models/clientI';
import { StringKeyValueI } from 'types/globalTypes';

const TAG: StringKeyValueI = {
  CLIENT: 'CLIENT',
};

export const contentApi = createApi({
  reducerPath: 'contentApi',
  keepUnusedDataFor: 0, // disable caching
  baseQuery: fetchBaseQuery({
    prepareHeaders: async (headers) => {
      const globalStore = require('store/store').default;
      const state = await globalStore.getState();
      headers.set('auth', state.user.token);
      return headers;
    },
    responseHandler: (response: Response): Promise<BaseResponseI<any>> => {
      if (response.status === 401) {
        const store = require('store/store').default;
        const { userSlice } = require('store/slices/userSlice');
        const { logout } = userSlice.actions;
        store.dispatch(logout());
        return Promise.reject(new Error('Unauthorized (401)'));
      }
      return response.json();
    },
  }),
  tagTypes: [TAG.CLIENT],
  endpoints: (build) => ({
    // CLIENT/////////////////////////////////////////////////////////////////////////////////////////////////////////
    fetchClient: build.query<BaseResponseI<clientI>, string>({
      query: () => ({ url: CLIENT }),
      providesTags: [TAG.CLIENT],
    }),
  }),
});
