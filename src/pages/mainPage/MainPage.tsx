import 'pages/mainPage/mainPage.scss';
import AudioPlayer from './player/Player';

const MainPage = () => (
  <div className="main">
    <div className="main__inner">
      <header>
        <h1>Magic player</h1>
      </header>

      <main>
        <AudioPlayer />
        <section className="audio-player">
          <button type="button" id="play-button">
            Воспроизвести
          </button>
          <div className="slider-container">
            <span>1 мин</span>
            <input
              type="range"
              id="interval-slider"
              min="0"
              max="60"
              value="30"
            />
            <span>60 сек</span>
          </div>
          <button id="upload-button" type="button">
            Загрузить трек
          </button>
        </section>

        <section className="track-list">
          <h2>Дефолтные треки</h2>
          <ul id="default-tracks">
            <li>
              Трек 1
              <button type="button" className="add-button">
                Добавить
              </button>
            </li>
            <li>
              Трек 2
              <button type="button" className="add-button">
                Добавить
              </button>
            </li>
            <li>
              Трек 3
              <button type="button" className="add-button">
                Добавить
              </button>
            </li>
          </ul>
        </section>

        <section className="track-list">
          <h2>Загруженные треки</h2>
          <ul id="uploaded-tracks"></ul>
        </section>
      </main>

      <footer>
        <p>Информация о сайте | Контакты | Социальные сети</p>
      </footer>
    </div>
  </div>
);
export default MainPage;
