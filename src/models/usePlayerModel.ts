import {
  useCreation,
  useLatest,
  useMemoizedFn,
  useSetState,
  useThrottleFn,
} from "ahooks";
import { createGlobalStore } from "hox";
import { isEmpty } from "ramda";
import { getSongUrl } from "../services/music.service";
import { useMusicModel } from "./useMusicModel";

export const [usePlayerModel, getPlayerModel] = createGlobalStore(() => {
  const { setState: setMusicState } = useMusicModel((store) => [
    store.setState,
  ]);

  const playerRef = useRef<HTMLAudioElement>(new Audio());

  const [state, setState] = useSetState({
    loading: false,
    currentTime: 0,
    duration: 0,
    isPlaying: false,
  });

  const currentTimeRef = useLatest(state.currentTime);

  const playMusic = useMemoizedFn(async (id: string) => {
    const { data } = await getSongUrl(id);
    const url = data[0].url;
    if (!isEmpty(url)) {
      setMusicState({
        currentSongId: id,
      });
      playerRef.current.src = url;
      playerRef.current.load();
      playerRef.current.play();
    }

    return null;
  });

  const { run: updateCurrentTime } = useThrottleFn(
    () => {
      setState({
        currentTime: (playerRef.current?.currentTime ?? 0) * 1000,
      });
    },
    {
      wait: 1000,
    }
  );

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

  playerRef.current?.addEventListener("playing", () => {
    setState({
      isPlaying: true,
    });
  });

  playerRef.current.addEventListener("durationchange", () => {
    setState({
      duration: (playerRef.current?.duration ?? 0) * 1000,
    });
  });

  playerRef.current?.addEventListener("canplay", () => {
    setState({
      loading: false,
      isPlaying: true,
    });
  });

  /** waiting */
  playerRef.current?.addEventListener("waiting", () => {
    setState({
      loading: true,
    });
  });

  /** pause */
  playerRef.current?.addEventListener("pause", () => {
    setState({
      isPlaying: false,
    });
  });

  playerRef.current?.addEventListener("seeking", () => {});

  playerRef.current?.addEventListener("ended", () => {
    setState({
      isPlaying: false,
    });
  });

  playerRef.current?.addEventListener("timeupdate", () => {
    setState({
      currentTime: (playerRef.current?.currentTime ?? 0) * 1000,
    });
  });

  useCreation(() => {
    return () => {
      if (playerRef.current) {
        clearPlayer();
      }
    };
  }, []);

  return {
    player: playerRef.current,
    loading: state.loading,
    currentTime: currentTimeRef.current,
    duration: state.duration,
    isPlaying: state.isPlaying,
    playMusic,
  };
});
