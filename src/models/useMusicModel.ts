import { useAsyncEffect, useLatest, useMemoizedFn, useSetState } from "ahooks";
import { createGlobalStore } from "hox";
import { getSongDetail } from "../services/music.service";
import { formatArtists, formatImageSize } from "../utils";
import { shuffleList } from "../utils/tools";

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
  const currentMusicList = useRef<string[]>([]);

  const [state, setState] = useSetState({
    songList: [] as string[],
    currentSongId: undefined as string | undefined,
    currentPlaylistId: undefined as string | undefined,
    playType: 2 as 0 | 1 | 2,
    playInfo: null as PlayMusicInfoType | null,
    duration: 0,
  });

  const currentSongRef = useLatest(state.currentSongId);
  const currentPlaylistRef = useLatest(state.currentPlaylistId);
  const playTypeRef = useLatest(state.playType);
  const musicInfoRef = useLatest(state.playInfo);

  const handleMusicListAction = useMemoizedFn(
    (action: "add" | "update" | "remove", ids: string | string[]) => {
      switch (action) {
        case "add":
          const addList = [
            ...state.songList,
            ...(typeof ids === "object" ? ids : [ids]),
          ];
          setState({
            songList: addList,
          });
          currentMusicList.current = shuffleList(addList);
          break;
        case "update":
          const updateList = [...(typeof ids === "object" ? ids : [ids])];
          setState({
            songList: updateList,
          });
          currentMusicList.current = shuffleList(updateList);
          break;
        case "remove":
          if (typeof ids === "string") {
            let musicIndex = currentMusicList.current.indexOf(ids);
            currentMusicList.current.splice(musicIndex, 1);
          }
          break;
      }
    }
  );

  useAsyncEffect(async () => {
    if (state.currentSongId && state.currentSongId !== null) {
      const res = await getSongDetail(state.currentSongId);
      const songInfo = res.songs[0];
      setState({
        playInfo: {
          id: songInfo.id,
          art: formatArtists(songInfo.ar),
          name: songInfo.name,
          pic: formatImageSize(songInfo.al.picUrl, 128),
        },
        duration: songInfo.dt,
      });
    }
  }, [state.currentSongId]);

  return {
    currentSongId: currentSongRef.current,
    currentPlaylistId: currentPlaylistRef.current,
    playType: playTypeRef.current,
    musicInfo: musicInfoRef.current,
    currentList: currentMusicList.current,
    duration: state.duration,
    setState,
    musicListAction: handleMusicListAction,
  };
});
