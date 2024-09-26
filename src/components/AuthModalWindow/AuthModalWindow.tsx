import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './authModalWindow.scss';
const MySwal = withReactContent(Swal);

const AuthModalWindow = () => {
  const handleLoginModal = () => {
    MySwal.fire({
      title: 'Авторизация',
      html: `
        <input type="text" id="login" class="swal2-input" placeholder="Логин">
        <input type="password" id="password" class="swal2-input" placeholder="Пароль">
      `,
      showCancelButton: true,
      confirmButtonText: 'Войти',
      cancelButtonText: 'Отмена',
      preConfirm: () => {
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
            return false; // Останавливает выполнение при отсутствии данных
          }

          // Проверка логина и пароля
          if (login === 'admin' && password === 'password123') {
            return true;
          }
          Swal.showValidationMessage('Неверный логин или пароль');
          return false;
        }
        return false;
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
  };

  return (
    <div className="authModalWindow">
      <button type="button" onClick={handleLoginModal}>
        Открыть форму авторизации
      </button>
    </div>
  );
};

export default AuthModalWindow;
