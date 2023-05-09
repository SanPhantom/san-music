import { Box, useTheme } from "@mui/material";
import { Lyric } from "san-lyric";
import { useMusicModel } from "../../models/useMusicModel";
import { usePlayerModel } from "../../models/usePlayerModel";
import { useUserModel } from "../../models/useUserModel";
import "san-lyric/dist/main.css";

const MusicLyric = () => {
  const theme = useTheme();
  const { duration, lyrics } = useMusicModel((state) => [
    state.currentSongId,
    state.duration,
    state.lyrics,
  ]);
  const { currentTime } = usePlayerModel((state) => [state.currentTime]);
  const { userFps } = useUserModel((state) => [state.userFps]);

  return (
    <Box
      className="lyric-container"
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Lyric
        lyrics={lyrics}
        currentTime={currentTime}
        duration={duration}
        fps={userFps}
        selectColor={theme.palette.primary.main}
        color={theme.palette.common.white}
      />
    </Box>
  );
};

export default MusicLyric;
