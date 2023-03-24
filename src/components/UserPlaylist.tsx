import { useAsyncEffect, useCreation, useSetState } from "ahooks";
import React from "react";
import { useUserModel } from "../models/useUserModel";
import { getUserPlaylist } from "../services/playlist.service";
import { filter } from "ramda";
import PlaylistView from "./playlist/PlaylistView";
import { Box, Divider, Stack } from "@mui/material";

interface IUserPlaylistProps {}

const UserPlaylist = () => {
  const { user } = useUserModel();
  const [state, setState] = useSetState({
    playlist: [] as any[],
  });

  const { createPlaylist, collectPlaylist, lovePlaylist } = useCreation(() => {
    const uid = user.userInfo?.id;
    const noLovePlaylist = state.playlist.concat().slice(1);
    const createPlaylist = filter((item: any) => item.userId === uid)(
      noLovePlaylist
    );
    const collectPlaylist = filter((item: any) => item.userId !== uid)(
      noLovePlaylist
    );
    return {
      createPlaylist,
      collectPlaylist,
      lovePlaylist: [state.playlist[0]],
    };
  }, [state.playlist, user.userInfo?.id]);

  useAsyncEffect(async () => {
    if (user.userInfo?.id) {
      const { playlist } = await getUserPlaylist({
        uid: user.userInfo.id,
      });
      setState({
        playlist,
      });
    }
  }, [user.userInfo?.id]);

  return (
    <Stack spacing={1.5}>
      <PlaylistView title="我的音乐" playlist={lovePlaylist} />
      <PlaylistView title="我创建的音乐" playlist={createPlaylist} />
      <PlaylistView title="我收藏的音乐" playlist={collectPlaylist} />
    </Stack>
  );
};

export default UserPlaylist;
