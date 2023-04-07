import { useCreation, useLatest, useMemoizedFn, useSetState } from "ahooks";
import { createStore } from "hox";
import { checkSongPlay, getSongUrl } from "../services/music.service";

export const [usePlayerModel, PlayerStoreProvider] = createStore(() => {
  const [state, setState] = useSetState({
    loading: false,
    currentTime: 0,
    duration: 0,
    isPlaying: false,
    player: new Audio(),
  });

  const currentTimeRef = useLatest(state.currentTime);
  const durationRef = useLatest(state.duration);
  const playerStatusRef = useLatest(state.isPlaying);

  const playMusic = useMemoizedFn(async (id: string) => {
    const res = await checkSongPlay(id);
    if (res.success) {
      const { data } = await getSongUrl(id);
      const url = data[0].url;
      state.player.src = url;
      state.player.load();
      state.player.play();
    }
    return null;
  });

  useCreation(() => {
    /** 正在播放中 */
    state.player.addEventListener("playing", () => {
      setState({
        isPlaying: true,
      });
    });

    state.player.addEventListener("canplay", () => {
      setState({
        loading: false,
        isPlaying: true,
      });
    });

    /** waiting */
    state.player.addEventListener("waiting", () => {
      setState({
        loading: true,
      });
    });

    /** pause */
    state.player.addEventListener("pause", () => {
      console.log(Date.now());
      setState({
        isPlaying: false,
      });
    });

    state.player.addEventListener("seeking", () => {});

    state.player.addEventListener("ended", () => {
      setState({
        isPlaying: false,
      });
    });

    state.player.addEventListener("timeupdate", () => {
      setState({
        currentTime: state.player.currentTime * 1000,
        duration: state.player.duration * 1000,
      });
    });

    return () => {
      state.player.removeEventListener("timeupdate", () => {});
      state.player.removeEventListener("playing", () => {});
      state.player.removeEventListener("play", () => {});
      state.player.removeEventListener("seeked", () => {});
      state.player.removeEventListener("ended", () => {});
      state.player.removeEventListener("pause", () => {});
      state.player.removeEventListener("canplay", () => {});
      state.player.removeEventListener("waiting", () => {});
    };
  }, [state.player]);

  return {
    player: state.player,
    loading: state.loading,
    currentTime: currentTimeRef.current,
    duration: durationRef.current,
    isPlaying: playerStatusRef.current,
    playMusic,
  };
});
