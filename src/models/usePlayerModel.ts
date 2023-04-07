import { useLatest, useSetState } from "ahooks";
import { createStore } from "hox";
import { checkSongPlay, getSongUrl } from "../services/music.service";

export const [usePlayerModel, PlayerStoreProvider] = createStore(() => {
  const [state, setState] = useSetState({
    loading: false,
    player: new Audio(),
  });

  const currentTimeRef = useLatest(state.player.currentTime);
  const durationRef = useLatest(state.player.duration);

  const playMusic = async (id: string) => {
    const res = await checkSongPlay(id);
    if (res.success) {
      const { data } = await getSongUrl(id);
      const url = data[0].url;
      state.player.src = url;
      state.player.load();
      state.player.play();
    }
    return null;
  };

  /** 正在播放中 */
  state.player.addEventListener("playing", () => {});

  state.player.addEventListener("canplay", () => {
    setState({
      loading: false,
    });
  });

  /** waiting */
  state.player.addEventListener("waiting", () => {
    setState({
      loading: true,
    });
  });

  /** pause */
  state.player.addEventListener("pause", () => {});

  state.player.addEventListener("seeking", () => {});

  state.player.addEventListener("ended", () => {});

  return {
    player: state.player,
    loading: state.loading,
    currentTime: currentTimeRef.current,
    duration: durationRef.current,
    playMusic,
  };
});
