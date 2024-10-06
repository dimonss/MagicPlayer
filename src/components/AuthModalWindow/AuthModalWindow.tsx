import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './authModalWindow.scss';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { userSlice } from 'store/slices/userSlice';
import { useCallback, useEffect } from 'react';

const MySwal = withReactContent(Swal);

const AuthModalWindow = () => {
  const { auth } = userSlice.actions;
  const dispatch = useAppDispatch();
  const { tryPlayWithoutAuth } = userSlice.actions;
  const handleLoginModal = useCallback(() => {
    dispatch(tryPlayWithoutAuth(false));
    MySwal.fire({
      title: 'Авторизация',
      html: `
      <input type="text" id="login" class="swal2-input" placeholder="Логин">
      <input type="password" id="password" class="swal2-input" placeholder="Пароль">
    `,
      showCancelButton: true,
      confirmButtonText: 'Войти',
      cancelButtonText: 'Отмена',
      preConfirm: async () => {
        const loginElement = Swal.getPopup()?.querySelector(
          '#login',
        ) as HTMLInputElement | null;
        const passwordElement = Swal.getPopup()?.querySelector(
          '#password',
        ) as HTMLInputElement | null;

        if (loginElement && passwordElement) {
          const login = loginElement.value;
          const password = passwordElement.value;

          if (!login || !password) {
            Swal.showValidationMessage('Введите логин и пароль');
            return false; // Останавливаем выполнение при отсутствии данных
          }

          try {
            const response = await fetch('/auth', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                login,
                password,
              },
            });

            if (!response.ok) {
              Swal.showValidationMessage('Неверный логин или пароль');
              return false;
            }

            const data = await response.json();
            const token = data.data.token || null;

            if (!token) {
              Swal.showValidationMessage('Неверный логин или пароль');
              return false;
            }
            dispatch(auth(data.data.token));

            return true; // Возвращаем успех, если токен получен
          } catch (error) {
            Swal.showValidationMessage('Ошибка авторизации');
            return false; // Возвращаем ошибку при запросе
          }
        }

        Swal.showValidationMessage('Введите логин и пароль');
        return false; // Останавливаем выполнение при отсутствии данных
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Успешно!',
          text: 'Вы успешно вошли в систему!',
        });
      }
    });
  }, [auth, dispatch, tryPlayWithoutAuth]);
  const localTryPlayWithoutAuth = useAppSelector(
    (state) => state.user.tryPlayWithoutAuth,
  );
  useEffect(() => {
    if (localTryPlayWithoutAuth) handleLoginModal();
  }, [handleLoginModal, localTryPlayWithoutAuth]);

  return (
    <div className="authModalWindow">
      <button type="button" onClick={handleLoginModal}>
        Войти
      </button>
    </div>
  );
};

export default AuthModalWindow;
