import { PlayCircle } from "@mui/icons-material";
import { Button, Divider, Paper, Stack } from "@mui/material";
import {
  useBoolean,
  useCreation,
  useLatest,
  useMemoizedFn,
  useRequest,
} from "ahooks";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/common/Loading";
import MusicSongItem from "../components/music/MusicSongItem";
import PlaylistHeader from "../components/playlist/PlaylistHeader";
import {
  getPlaylistDetail,
  getPlaylistSongs,
} from "../services/playlist.service";
import LoadingView from "../components/common/LoadingView";

const PlaylistPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, run, loading } = useRequest(getPlaylistDetail, {
    manual: true,
  });
  const playlistRef = useLatest(data?.playlist);

  const [songs, setSongs] = useState<any[]>([]);
  const [songsLoading, { setTrue: startLoading, setFalse: closeLoading }] =
    useBoolean(false);

  const getSongs = useMemoizedFn(async (trackCount: number, id: string) => {
    return Promise.all(
      new Array(Math.ceil(trackCount / 150))
        .fill(0)
        .map((_, index: number) => getPlaylistSongs(id, index, 150))
    );
  });

  useCreation(async () => {
    if (playlistRef.current && id) {
      const trackCount = playlistRef.current?.trackCount ?? 0;
      startLoading();
      const res = await getSongs(trackCount, id);
      const songList = res.map((item: any) => item.songs).flat();
      setSongs(songList);
      closeLoading();
    }
  }, [data]);

  useCreation(() => {
    if (id) {
      run(id);
    }
  }, [id]);

  return (
    <LoadingView loading={loading}>
      {data && (
        <Stack spacing={2}>
          <PlaylistHeader info={playlistRef.current} />
          <Paper
            sx={{ px: 2, py: 1.5, borderRadius: 2, minHeight: "45vh" }}
            elevation={2}
          >
            <Stack
              sx={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                px: 1,
              }}
            >
              <Button
                startIcon={<PlayCircle />}
                variant="outlined"
              >{`播放全部(${playlistRef.current?.trackCount}首)`}</Button>
            </Stack>
            <Divider sx={{ my: 1.5, mx: -2 }} />
            <LoadingView loading={songsLoading}>
              <Stack>
                {songs.map((item, index) => (
                  <MusicSongItem
                    showAction
                    song={item}
                    index={index + 1}
                    onItemClick={() => {}}
                  />
                ))}
              </Stack>
            </LoadingView>
          </Paper>
        </Stack>
      )}
    </LoadingView>
  );
};

export default PlaylistPage;
