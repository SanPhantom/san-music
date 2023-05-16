import { PlayCircle } from "@mui/icons-material";
import { Button, Divider, Paper, Stack } from "@mui/material";
import { useCreation, useLatest, useMemoizedFn, useRequest } from "ahooks";
import { useNavigate, useParams } from "react-router-dom";
import LoadingView from "../components/common/LoadingView";
import MusicSongItem from "../components/ListItem/MusicSongItem";
import PlaylistHeader from "../components/playlist/PlaylistHeader";
import {
  getPlaylistDetail,
  getPlaylistSongs,
} from "../services/playlist.service";
import { useMusicModel } from "../models/useMusicModel";

const PlaylistPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { musicListAction, setState: setMusicState } = useMusicModel(
    (store) => [store.musicListAction, store.setState]
  );

  const { data, run, loading } = useRequest(getPlaylistDetail, {
    manual: true,
  });
  const {
    data: songsRes,
    run: requestSongs,
    loading: songsLoading,
  } = useRequest(getPlaylistSongs, { manual: true });
  const playlistRef = useLatest(data?.playlist);

  const updateMusicList = useMemoizedFn(() => {
    const songs = songsRes.songs;
    setMusicState({
      currentPlaylistId: id,
    });
    musicListAction(
      "update",
      songs.map((song: any) => song.id)
    );
  });

  useCreation(async () => {
    if (playlistRef.current && id) {
      const trackCount = playlistRef.current?.trackCount ?? 0;
      requestSongs(id, 0, trackCount);
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
                {songsRes?.songs.map((item: any, index: number) => (
                  <MusicSongItem
                    key={item.id}
                    showAction
                    song={item}
                    index={index + 1}
                    onItemClick={updateMusicList}
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
