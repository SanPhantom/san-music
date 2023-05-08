import { Box, IconButton, Stack, SvgIcon, Typography } from "@mui/material";
import { usePlayerModel } from "../../models/usePlayerModel";
import { transTime } from "../../utils";
import { useMusicModel } from "../../models/useMusicModel";
import PlayController from "../miniPlayer/PlayController";
import PrevIconButton from "../buttons/PrevIconButton";
import NextIconButton from "../buttons/NextIconButton";

interface IMusicControlProps {}

const MusicControl = () => {
  const { currentTime } = usePlayerModel((state) => [state.currentTime]);
  const { duration } = useMusicModel((store) => [store.duration]);

  return (
    <Stack sx={{ p: 2, gap: 1 }}>
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
        <Typography variant="body2">{transTime(currentTime)}</Typography>
        <Box
          sx={{
            flex: 1,
            height: 4,
            background: (theme) => theme.palette.primary.main,
            borderRadius: 2,
          }}
        />
        <Typography variant="body2">{transTime(duration)}</Typography>
      </Stack>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <PrevIconButton size={46} />
        <PlayController size={58} />
        <NextIconButton size={46} />
      </Stack>
    </Stack>
  );
};

export default MusicControl;
