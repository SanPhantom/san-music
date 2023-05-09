import { useAsyncEffect, useLatest, useMemoizedFn, useSetState } from "ahooks";
import { createGlobalStore } from "hox";
import { getSongDetail, getSongLyric } from "../services/music.service";
import { formatArtists, formatImageSize } from "../utils";
import { shuffleList } from "../utils/tools";
import { LyricItemType } from "san-lyric/dist/types/components/Lyric";
import { formatLyric } from "san-lyric";
import { getImageColor } from "../utils/colors";

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
  targetPic: string;
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

  const [lyrics, setLyrics] = useState<LyricItemType[]>([]);

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

  // const queryImageColor = useMemoizedFn(async (src: string) => {
  //   const image = new Image();
  //   image.crossOrigin = "*";
  //   image.src = src;
  //   const color = await getImageColor(image);
  // });

  useAsyncEffect(async () => {
    if (state.currentSongId && state.currentSongId !== null) {
      const res = await getSongDetail(state.currentSongId);
      const lyricsRes = await getSongLyric(state.currentSongId);
      const songInfo = res.songs[0];
      setLyrics(
        formatLyric(
          (lyricsRes?.lrc ?? { lyric: "" })?.lyric ?? "",
          (lyricsRes?.tlyric ?? { lyric: "" })?.lyric
        )
      );
      setState({
        playInfo: {
          id: songInfo.id,
          art: formatArtists(songInfo.ar),
          name: songInfo.name,
          pic: formatImageSize(songInfo.al.picUrl, 128),
          targetPic: songInfo.al.picUrl,
        },
        duration: songInfo.dt,
      });
      // queryImageColor(formatImageSize(songInfo.al.picUrl, 128));
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
    lyrics,
  };
});
