import { Box, alpha, useTheme } from "@mui/material";
import { useMusicModel } from "../../models/useMusicModel";
import { usePlayerModel } from "../../models/usePlayerModel";
import Lyric from "../common/Lyric";

const MusicLyric = () => {
  const theme = useTheme();
  const { lyrics } = useMusicModel((state) => [
    state.currentSongId,
    state.duration,
    state.lyrics,
  ]);
  const { player } = usePlayerModel((state) => [state.player]);

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
        player={player}
        color={alpha(theme.palette.common.white, 0.45)}
        selectedColor={theme.palette.common.white}
      />
    </Box>
  );
};

export default MusicLyric;
