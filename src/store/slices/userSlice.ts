import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LANGUAGE } from 'constants/globalConstants';

export type UserReduxI = {
  token: string;
  loggedIn: boolean;
  language: LANGUAGE;
  tryPlayWithoutAuth: boolean;
};

const initialState: UserReduxI = {
  token: '',
  loggedIn: false,
  language: LANGUAGE.RU,
  tryPlayWithoutAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    auth(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
    setLanguage(state, action: PayloadAction<LANGUAGE>) {
      state.language = action.payload;
    },
    tryPlayWithoutAuth(state, action: PayloadAction<boolean>) {
      state.tryPlayWithoutAuth = action.payload;
    },
    userSetInitialState: () => initialState,
  },
});

export default userSlice.reducer;
