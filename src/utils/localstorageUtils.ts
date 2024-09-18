import { rootReducer } from 'store/store';
const STORE_KEY = 'advertising_campaign';

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify({
      ...state,
      errors: undefined,
      loading: undefined,
    });
    localStorage.setItem(STORE_KEY, serializedState);
  } catch (err: any) {
    console.log(err);
  }
};

export const loadState = (): ReturnType<typeof rootReducer> | undefined => {
  try {
    const serializedState = localStorage.getItem(STORE_KEY);
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
