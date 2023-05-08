import {
  Avatar,
  CircularProgress,
  IconButton,
  Stack,
  SvgIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import { useMusicModel } from "../../models/useMusicModel";
import EllipsisText from "../common/EllipsisText/EllipsisText";
import MusicLinearProgress from "../miniPlayer/MusicLinearProgress";
import PlayController from "../miniPlayer/PlayController";
import PlayerTimer from "../miniPlayer/PlayerTimer";
import { usePlayerModel } from "../../models/usePlayerModel";
import PlayerFullScreen from "../miniPlayer/PlayerFullScreen";
import { useBoolean } from "ahooks";
import NextIconButton from "../buttons/NextIconButton";

const MusicMiniPlayer = () => {
  const { musicInfo } = useMusicModel((store) => [store.musicInfo]);

  const [
    isFullScreen,
    { setTrue: expansionFullScreen, setFalse: closeFullScreen },
  ] = useBoolean(false);

  return (
    <Toolbar
      className="abs-box "
      sx={{
        width: "100%",
        backgroundColor: (theme) => theme.palette.common.white,
        position: "relative",
      }}
    >
      <MusicLinearProgress />
      <Stack sx={{ height: "100%", width: "100%" }}>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems="center"
          sx={{ height: "100%" }}
          spacing={4}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Avatar
              src={musicInfo?.pic}
              variant="rounded"
              onClick={expansionFullScreen}
            >
              <CircularProgress size={16} />
            </Avatar>
            <Stack>
              {musicInfo?.id && (
                <EllipsisText variant="body2">
                  <Typography
                    component={"span"}
                    variant="body2"
                    color={false ? "primary.main" : ""}
                  >
                    {musicInfo?.name}
                  </Typography>
                  {musicInfo?.art && (
                    <Typography
                      component={"span"}
                      variant="body2"
                      color={"text.secondary"}
                    >{` - ${musicInfo?.art}`}</Typography>
                  )}
                </EllipsisText>
              )}
              <PlayerTimer />
            </Stack>
          </Stack>

          <Stack direction={"row"} spacing={1.5} alignItems={"center"}>
            <PlayController />
            <NextIconButton size={46} />
          </Stack>
        </Stack>
      </Stack>
      <PlayerFullScreen open={isFullScreen} onClose={closeFullScreen} />
    </Toolbar>
  );
};

export default MusicMiniPlayer;
