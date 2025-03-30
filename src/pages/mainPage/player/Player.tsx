import { useRef, useState, ChangeEvent } from 'react';
import 'pages/mainPage/player/player.scss';
import audio1 from '../../../audio/1.mp3';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { userSlice } from 'store/slices/userSlice';
import { contentApi } from 'API/contentApi';
import { API_RESPONSE_STATUS } from 'types/DTOTypes';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1); // Значение от 1 до 2 для громкости до 200%
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);

  const initializeAudioContext = () => {
    if (!audioContext && audioRef.current) {
      const context = new AudioContext();
      const source = context.createMediaElementSource(audioRef.current);
      const gain = context.createGain();

      source.connect(gain);
      gain.connect(context.destination);

      setAudioContext(context);
      setGainNode(gain);
    }
  };
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const dispatch = useAppDispatch();
  const { tryPlayWithoutAuth } = userSlice.actions;

  const togglePlayPause = async () => {
    if (loggedIn) {
      try {
        console.log('contentApi');
        const result = await dispatch(
          contentApi.endpoints.fetchClient.initiate('', {
            forceRefetch: true,
          }),
        ).unwrap();
        console.log('contentApi1');
        // Доступ к данным, которые вернул запрос
        initializeAudioContext();
        if (audioRef.current) {
          if (isPlaying) {
            audioRef.current.pause();
          } else {
            audioRef.current.play();
          }
          setIsPlaying(!isPlaying);
        }
        console.log('Client Data:', result.data);

        // Обработка ошибок
        if (result.status === API_RESPONSE_STATUS.ERROR) {
          console.log('Error:', result.message);
        }
      } catch (err) {
        console.error('Error occurred during fetch:', err);
      }
    } else {
      dispatch(tryPlayWithoutAuth(true));
    }
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (gainNode) {
      gainNode.gain.value = newVolume; // Значение от 1.0 (100%) до 2.0 (200%)
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  return (
    <div className="audio-player">
      <button type="button" onClick={togglePlayPause}>
        {isPlaying ? 'Пауза' : 'Воспроизвести'}
      </button>
      <audio
        ref={audioRef}
        src={audio1}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      >
        <track kind="captions" />
      </audio>
      <div className="controls">
        <div className="time">
          {Math.floor(currentTime)} / {Math.floor(duration)}
        </div>
        <input
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
        <label>Громкость ({Math.round(volume * 100)}%)</label>
      </div>
    </div>
  );
};

export default AudioPlayer;
