import { PlayCircle, Queue, Share } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useCreation, useLatest, useMemoizedFn, useRequest } from "ahooks";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EllipsisText from "../components/common/EllipsisText/EllipsisText";
import Loading from "../components/common/Loading";
import MusicSongItem from "../components/music/MusicSongItem";
import {
  getPlaylistDetail,
  getPlaylistSongs,
} from "../services/playlist.service";
import { formatImageSize } from "../utils";
import PlaylistHeader from "../components/playlist/PlaylistHeader";

const PlaylistPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, run, loading } = useRequest(getPlaylistDetail, {
    manual: true,
  });
  const playlistRef = useLatest(data?.playlist);

  const [songs, setSongs] = useState<any[]>([]);

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
      const res = await getSongs(trackCount, id);
      const songList = res.map((item: any) => item.songs).flat();
      setSongs(songList);
    }
  }, [data]);

  useCreation(() => {
    if (id) {
      run(id);
    }
  }, [id]);

  return (
    <div>
      {loading && <Loading />}
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
          </Paper>
        </Stack>
      )}
    </div>
  );
};

export default PlaylistPage;
