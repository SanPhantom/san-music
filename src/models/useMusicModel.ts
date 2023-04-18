import { useAsyncEffect, useLatest, useSetState } from "ahooks";
import { createGlobalStore } from "hox";
import { isEmpty } from "ramda";
import { getSongDetail } from "../services/music.service";
import { formatArtists, formatImageSize } from "../utils";

export enum MusicPlayType {
  SuiJi = 0,
  DanQuXunHuan,
  LieBiaoXunHuan,
}

type PlayMusicInfoType = {
  pic: string;
  name: string;
  art: string;
  id: string;
};

export const [useMusicModel, getMusicModel] = createGlobalStore(() => {
  const [state, setState] = useSetState({
    songList: [],
    currentSongId: null as string | null,
    currentPlaylistId: null as string | null,
    playType: 2 as 0 | 1 | 2,
    playInfo: null as PlayMusicInfoType | null,
  });

  const currentSongRef = useLatest(state.currentSongId);
  const currentPlaylistRef = useLatest(state.currentPlaylistId);
  const playTypeRef = useLatest(state.playType);
  const musicInfoRef = useLatest(state.playInfo);

  useAsyncEffect(async () => {
    if (!isEmpty(state.currentSongId) && state.currentSongId !== null) {
      const res = await getSongDetail(state.currentSongId);
      const songInfo = res.songs[0];
      setState({
        playInfo: {
          id: songInfo.id,
          art: formatArtists(songInfo.ar),
          name: songInfo.name,
          pic: formatImageSize(songInfo.al.picUrl, 128),
        },
      });
    }
  }, [state.currentSongId]);

  return {
    currentSongId: currentSongRef.current,
    currentPlaylistId: currentPlaylistRef.current,
    playType: playTypeRef.current,
    musicInfo: musicInfoRef.current,
    setState,
  };
});
