import { useLatest, useSetState } from "ahooks";
import { createStore } from "hox";
import { checkSongPlay, getSongUrl } from "../services/music.service";

export const [usePlayerModel, PlayerStoreProvider] = createStore(() => {
  const player = new Audio();

  const [state, setState] = useSetState({
    loading: false,
  });

  const currentTimeRef = useLatest(player.currentTime);
  const durationRef = useLatest(player.duration);

  const playMusic = async (id: string) => {
    const res = await checkSongPlay(id);
    if (res.success) {
      const { data } = await getSongUrl(id);
      const url = data[0].url;
      player.src = url;
      player.load();
      player.play();
    }
    return null;
  };

  /** 正在播放中 */
  player.addEventListener("playing", () => {});

  player.addEventListener("canplay", () => {
    setState({
      loading: false,
    });
  });

  /** waiting */
  player.addEventListener("waiting", () => {
    setState({
      loading: true,
    });
  });

  /** pause */
  player.addEventListener("pause", () => {});

  player.addEventListener("seeking", () => {});

  player.addEventListener("ended", () => {});

  return {
    player,
    loading: state.loading,
    currentTime: currentTimeRef.current,
    duration: durationRef.current,
    playMusic,
  };
});
