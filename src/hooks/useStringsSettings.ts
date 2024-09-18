import { getLanguageConstant } from 'utils/utils';
import { useAppDispatch } from 'hooks/reduxHooks';
import { userSlice } from 'store/slices/userSlice';

const useStringsSettings = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const language = getLanguageConstant(searchParams.get('language'));
  const dispatch = useAppDispatch();
  const { setLanguage } = userSlice.actions;
  dispatch(setLanguage(language));
};

export default useStringsSettings;
