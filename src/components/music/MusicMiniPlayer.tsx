import {
  Avatar,
  CircularProgress,
  IconButton,
  Stack,
  SvgIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactComponent as NextMusicIcon } from "../../assets/icon/-xiayishou.svg";
import { useMusicModel } from "../../models/useMusicModel";
import EllipsisText from "../common/EllipsisText/EllipsisText";
import MusicLinearProgress from "../miniPlayer/MusicLinearProgress";
import PlayController from "../miniPlayer/PlayController";
import PlayerTimer from "../miniPlayer/PlayerTimer";

const MusicMiniPlayer = () => {
  const { musicInfo } = useMusicModel((store) => [store.musicInfo]);

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
            <Avatar src={musicInfo?.pic} variant="rounded">
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
            <IconButton sx={{ m: 0, p: 0 }}>
              <SvgIcon
                component={NextMusicIcon}
                inheritViewBox
                sx={{ fontSize: 42 }}
              />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Toolbar>
  );
};

export default MusicMiniPlayer;
