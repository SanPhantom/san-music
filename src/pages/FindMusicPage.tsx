import { CalendarToday, Radio } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useCreation } from "ahooks";
import NewSongsPull from "../components/NewSongsPull";
import RecommendResource from "../components/RecommendResource";
import SingleCard from "../components/common/SingleCard";
import MusicBanner from "../components/music/MusicBanner";
import { getRecommendSongs } from "../services/playlist.service";
import Title from "../components/common/Title";

const FindMusicPage = () => {
  useCreation(async () => {
    const { data } = await getRecommendSongs();
  }, []);

  return (
    <Stack spacing={3}>
      <MusicBanner />
      <Stack direction={"row"} spacing={2}>
        <Button sx={{ p: 0, flex: 1 }}>
          <SingleCard
            label="每日推荐"
            icon={<CalendarToday color="primary" />}
          />
        </Button>
        <Button sx={{ p: 0, flex: 1 }}>
          <SingleCard label="私人FM" icon={<Radio color="primary" />} />
        </Button>
      </Stack>
      <RecommendResource />
      <NewSongsPull />
      <Stack>
        <Stack>
          <Title showTab label="最新榜单" />
        </Stack>
        <Box sx={{ minHeight: 120 }}></Box>
      </Stack>
    </Stack>
  );
};

export default FindMusicPage;
