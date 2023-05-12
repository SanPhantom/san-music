import { alpha, Stack } from "@mui/material";
import { useMount, useRequest } from "ahooks";
import { newSongExpress } from "../services/playlist.service";
import LoadingView from "./common/LoadingView";
import Title from "./common/Title";
import MusicSongItem from "./music/MusicSongItem";
import { useMusicModel } from "../models/useMusicModel";

const NewSongsPull = () => {
  const { musicListAction } = useMusicModel((store) => [store.musicListAction]);
  const { data, run, loading } = useRequest(newSongExpress, {
    manual: true,
  });

  useMount(() => {
    run();
  });

  return (
    <Stack spacing={2}>
      <Title showTab label="新歌速递" />
      <LoadingView loading={loading} minHeight={120}>
        <Stack direction={"row"} spacing={2}>
          <Stack
            sx={{
              flex: 1,
              px: 1,
              py: 1.5,
              border: 1,
              borderRadius: 2,
              gap: 1,
              borderColor: (theme) => alpha(theme.palette.text.secondary, 0.1),
            }}
          >
            {(data?.result ?? []).slice(0, 5).map((item: any) => (
              <MusicSongItem
                key={item.id}
                song={item.song}
                onItemClick={() => {
                  musicListAction("add", item.id);
                }}
              />
            ))}
          </Stack>
          <Stack
            sx={{
              flex: 1,
              px: 1,
              py: 1.5,
              border: 1,
              borderRadius: 2,
              gap: 1,
              borderColor: (theme) => alpha(theme.palette.text.secondary, 0.1),
            }}
          >
            {(data?.result ?? []).slice(5, 10).map((item: any) => (
              <MusicSongItem
                key={item.id}
                song={item.song}
                onItemClick={() => {
                  musicListAction("add", item.id);
                }}
              />
            ))}
          </Stack>
        </Stack>
      </LoadingView>
    </Stack>
  );
};

export default NewSongsPull;
