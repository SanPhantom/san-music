import { alpha, Paper, Stack, Typography } from "@mui/material";
import { useMount, useRequest } from "ahooks";
import { newSongExpress } from "../services/playlist.service";
import { formatArtists, formatImageSize } from "../utils";
import CommonListItem from "./common/CommonListItem";
import Loading from "./common/Loading";

const NewSongsPull = () => {
  const { data, run, loading } = useRequest(newSongExpress, {
    manual: true,
  });

  useMount(() => {
    run();
  });

  return (
    <Stack spacing={1}>
      <Stack spacing={1} direction="row" alignItems={"center"}>
        <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1 }}>
          新歌速递
        </Typography>
      </Stack>
      <Stack sx={{ minHeight: 120 }}>
        {loading ? (
          <Loading />
        ) : (
          <Stack direction={"row"} spacing={2}>
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                p: 2,
                border: 1,
                borderColor: (theme) =>
                  alpha(theme.palette.text.secondary, 0.1),
              }}
            >
              {data?.result.slice(0, 5).map((item: any) => (
                <CommonListItem
                  primary={item.song.name}
                  secondary={formatArtists(item.song.artists)}
                  avatar={formatImageSize(item.song.album.picUrl, 40)}
                />
              ))}
            </Paper>
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                p: 2,
                border: 1,
                borderColor: (theme) =>
                  alpha(theme.palette.text.secondary, 0.1),
              }}
            >
              {data?.result.slice(5, 10).map((item: any) => (
                <CommonListItem
                  primary={item.song.name}
                  secondary={formatArtists(item.song.artists)}
                  avatar={formatImageSize(item.song.album.picUrl, 40)}
                />
              ))}
            </Paper>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default NewSongsPull;
