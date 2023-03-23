import { CalendarToday, ChevronRight, Radio } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useCreation } from "ahooks";
import React from "react";
import MusicBanner from "../components/music/MusicBanner";
import NewSongsPull from "../components/NewSongsPull";
import RecommendResource from "../components/RecommendResource";
import {
  getRecommendPlaylist,
  getRecommendSongs,
} from "../services/playlist.service";

interface IFindMusicPageProps {}

const FindMusicPage = () => {
  useCreation(async () => {
    const { data } = await getRecommendSongs();
    // console.log({ list: data.dailySongs });
  }, []);

  return (
    <Stack spacing={3}>
      <MusicBanner />
      <Stack direction={"row"} spacing={2}>
        <Button sx={{ p: 0, flex: 1 }}>
          <Paper
            component={Stack}
            direction="row"
            spacing={1}
            sx={{ width: "100%", p: 2, cursor: "pointer" }}
          >
            <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
              <CalendarToday color="primary" />
              <Typography>每日推荐</Typography>
            </Stack>
            <ChevronRight />
          </Paper>
        </Button>
        <Button sx={{ p: 0, flex: 1 }}>
          <Paper
            component={Stack}
            direction="row"
            spacing={1}
            sx={{ width: "100%", p: 2, cursor: "pointer" }}
          >
            <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
              <Radio color="primary" />
              <Typography>私人FM</Typography>
            </Stack>
            <ChevronRight />
          </Paper>
        </Button>
      </Stack>
      <RecommendResource />
      <NewSongsPull />
      <Stack>
        <Stack>
          <Typography variant="h6" fontWeight={600}>
            最新榜单
          </Typography>
        </Stack>
        <Box sx={{ minHeight: 120 }}></Box>
      </Stack>
    </Stack>
  );
};

export default FindMusicPage;
