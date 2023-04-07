import { useLatest, useSetState } from "ahooks";
import { createGlobalStore } from "hox";

export enum MusicPlayType {
  SuiJi = 0,
  DanQuXunHuan,
  LieBiaoXunHuan,
}

export const [useUserModel, getUserModel] = createGlobalStore(() => {
  const [state, setState] = useSetState({
    songList: [],
    currentSongId: null as string | null,
    currentPlaylistId: null as string | null,
    playType: 2 as 0 | 1 | 2,
  });

  const currentSongRef = useLatest(state.currentSongId);
  const currentPlaylistRef = useLatest(state.currentPlaylistId);
  const playTypeRef = useLatest(state.playType);

  return {
    currentSongId: currentSongRef.current,
    currentPlaylistId: currentPlaylistRef.current,
    playType: playTypeRef.current,
  };
});
