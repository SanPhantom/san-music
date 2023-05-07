import { useBoolean, useCreation, useMemoizedFn } from "ahooks";
import { createGlobalStore } from "hox";
import { isEmpty } from "ramda";
import { getSongUrl } from "../services/music.service";
import { useMusicModel } from "./useMusicModel";

export const [usePlayerModel, getPlayerModel] = createGlobalStore(() => {
  const {
    setState: setMusicState,
    currentList,
    currentSongId,
  } = useMusicModel((store) => [
    store.setState,
    store.currentList,
    store.currentSongId,
  ]);

  const playerRef = useRef<HTMLAudioElement>(new Audio());

  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  const [audioSource, setAudioSource] =
    useState<MediaElementAudioSourceNode | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const [isPlaying, { setTrue: startPlaying, setFalse: stopPlaying }] =
    useBoolean(false);
  const [loading, { setTrue: startLoading, setFalse: closeLoading }] =
    useBoolean(false);

  const [currentTime, setCurrentTime] = useState(0);

  const playMusic = useMemoizedFn(async (id: string) => {
    const { data } = await getSongUrl(id);
    const url = data[0].url;

    if (!isEmpty(url) && playerRef.current) {
      setMusicState({
        currentSongId: id,
      });
      playerRef.current.src = url;
      playerRef.current.load();
      playerRef.current.play();
    }

    return null;
  });

  const nextMusic = useMemoizedFn(() => {
    if (currentList && currentSongId) {
      let musicIndex = currentList.indexOf(currentSongId);
      musicIndex = musicIndex + 1;
      if (musicIndex === currentList.length) {
        musicIndex = 0;
      }
      playMusic(currentList[musicIndex]);
    }
  });

  const prevMusic = useMemoizedFn(() => {
    if (currentList && currentSongId) {
      let musicIndex = currentList.indexOf(currentSongId);
      musicIndex = musicIndex - 1;
      if (musicIndex === -1) {
        musicIndex = currentList.length - 1;
      }
      playMusic(currentList[musicIndex]);
    }
  });

  const clearPlayer = useMemoizedFn(() => {
    playerRef.current?.removeEventListener("timeupdate", () => {});
    playerRef.current?.removeEventListener("playing", () => {});
    playerRef.current?.removeEventListener("play", () => {});
    playerRef.current?.removeEventListener("seeked", () => {});
    playerRef.current?.removeEventListener("ended", () => {});
    playerRef.current?.removeEventListener("pause", () => {});
    playerRef.current?.removeEventListener("canplay", () => {});
    playerRef.current?.removeEventListener("waiting", () => {});
  });

  useCreation(() => {
    if (audioCtx) {
      const baseAnalyser = new AnalyserNode(audioCtx);
      baseAnalyser.fftSize = 2048;
      setAnalyser(baseAnalyser);
      setAudioSource(
        new MediaElementAudioSourceNode(audioCtx, {
          mediaElement: playerRef.current,
        })
      );
    }
  }, [audioCtx]);

  useCreation(() => {
    if (audioSource && analyser && audioCtx) {
      audioSource?.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
  }, [analyser, audioSource, audioCtx]);

  useCreation(() => {
    playerRef.current.crossOrigin = "anonymous";

    playerRef.current?.addEventListener("playing", () => {
      startPlaying();
      if (!audioCtx) {
        setAudioCtx(new AudioContext());
      }
    });

    playerRef.current?.addEventListener("canplay", () => {
      startPlaying();
      closeLoading();
    });

    /** waiting */
    playerRef.current?.addEventListener("waiting", () => {
      startLoading();
    });

    /** pause */
    playerRef.current?.addEventListener("pause", () => {
      stopPlaying();
    });

    playerRef.current?.addEventListener("seeking", () => {});

    playerRef.current?.addEventListener("ended", () => {
      stopPlaying();
      nextMusic();
    });

    playerRef.current?.addEventListener("timeupdate", () => {
      setCurrentTime((playerRef.current?.currentTime ?? 0) * 1000);
    });

    return () => {
      clearPlayer();
    };
  }, []);

  return {
    player: playerRef.current,
    loading,
    currentTime,
    isPlaying,
    playMusic,
    nextMusic,
    prevMusic,
    audioCtx,
    audioSource,
    analyser,
  };
});
