import {
  Avatar,
  CircularProgress,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useBoolean } from "ahooks";
import { useMusicModel } from "../../models/useMusicModel";
import NextIconButton from "../buttons/NextIconButton";
import EllipsisText from "../common/EllipsisText/EllipsisText";
import MusicLinearProgress from "../miniPlayer/MusicLinearProgress";
import PlayController from "../miniPlayer/PlayController";
import PlayerFullScreen from "../miniPlayer/PlayerFullScreen";
import PlayerTimer from "../miniPlayer/PlayerTimer";

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
            <NextIconButton />
          </Stack>
        </Stack>
      </Stack>
      <PlayerFullScreen open={isFullScreen} onClose={closeFullScreen} />
    </Toolbar>
  );
};

export default MusicMiniPlayer;
