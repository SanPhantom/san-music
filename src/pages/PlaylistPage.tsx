import { useCreation, useLatest, useMemoizedFn, useRequest } from "ahooks";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPlaylistDetail,
  getPlaylistSongs,
} from "../services/playlist.service";
import { isEmpty } from "ramda";
import Loading from "../components/common/Loading";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { formatImageSize } from "../utils";
import EllipsisText from "../components/common/EllipsisText/EllipsisText";
import MusicSongItem from "../components/music/MusicSongItem";

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
          <Stack
            spacing={2}
            direction={"row"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
            sx={{ width: "100%" }}
          >
            <Box>
              <Avatar
                src={formatImageSize(playlistRef.current?.coverImgUrl, 148)}
                sx={{ width: 148, height: 148 }}
                alt=""
                variant="rounded"
              />
            </Box>
            <Stack>
              <EllipsisText
                variant="body1"
                fontWeight={600}
                line={2}
                fontSize={18}
              >
                {playlistRef.current?.name}
              </EllipsisText>
            </Stack>
          </Stack>
          <Divider sx={{ width: "100%" }} />
          <Stack divider={<Divider variant="inset" />}>
            {songs.map((item, index) => (
              <MusicSongItem song={item} index={index + 1} />
            ))}
          </Stack>
        </Stack>
      )}
    </div>
  );
};

export default PlaylistPage;
