import {
  Stack,
  Typography,
  Box,
  Select,
  Paper,
  CardContent,
  alpha,
} from "@mui/material";
import { useCreation, useRequest, useSetState } from "ahooks";
import React from "react";
import { newSongExpress } from "../services/playlist.service";
import { formatArtists, formatImageSize } from "../utils";
import CommonListItem from "./common/CommonListItem";
import Loading from "./common/Loading";
import TypeSelect from "./common/TypeSelect";

interface INewSongsPullProps {}

const NewSongsPull = () => {
  const [state, setState] = useSetState({
    selectType: 0,
  });

  const { data, run, loading } = useRequest(newSongExpress, {
    manual: true,
  });

  console.log({ data: data?.data });

  useCreation(() => {
    run({ type: state.selectType });
  }, [state.selectType]);

  return (
    <Stack spacing={1}>
      <Stack spacing={1} direction="row" alignItems={"center"}>
        <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1 }}>
          新歌速递
        </Typography>
        <TypeSelect
          value={state.selectType}
          onSelect={(type) => setState({ selectType: type })}
        />
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
              {data?.data.slice(0, 5).map((item: any) => (
                <CommonListItem
                  primary={item.name}
                  secondary={formatArtists(item.artists)}
                  avatar={formatImageSize(item.album.picUrl, 40)}
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
              {data?.data.slice(5, 10).map((item: any) => (
                <CommonListItem
                  primary={item.name}
                  secondary={formatArtists(item.artists)}
                  avatar={formatImageSize(item.album.picUrl, 40)}
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
