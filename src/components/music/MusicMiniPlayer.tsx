import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Stack,
  SvgIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactComponent as BoFangIcon } from "../../assets/icon/-bofang.svg";
import { ReactComponent as NextMusicIcon } from "../../assets/icon/-xiayishou.svg";
import { ReactComponent as ZanTingIcon } from "../../assets/icon/-zanting.svg";
import { usePlayerModel } from "../../models/usePlayerModel";
import { transTime } from "../../utils";
import { useMusicModel } from "../../models/useMusicModel";
import EllipsisText from "../common/EllipsisText/EllipsisText";

const MusicMiniPlayer = () => {
  const { currentTime, duration, player, isPlaying } = usePlayerModel();
  const { musicInfo } = useMusicModel();

  return (
    <Toolbar
      className="abs-box "
      sx={{
        width: "100%",
        backgroundColor: (theme) => theme.palette.common.white,
        position: "relative",
      }}
    >
      <LinearProgress
        variant="determinate"
        value={(currentTime / duration) * 100}
        sx={{
          width: "100%",
          height: 2,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
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
              <Typography
                variant="caption"
                color={"text.secondary"}
              >{`${transTime(currentTime)} / ${transTime(
                duration
              )}`}</Typography>
            </Stack>
          </Stack>

          <Stack direction={"row"} spacing={1.5} alignItems={"center"}>
            <IconButton
              sx={{ m: 0, p: 0 }}
              onClick={() => {
                if (isPlaying) {
                  console.log(Date.now());
                  player.pause();
                } else {
                  player.play();
                }
              }}
            >
              <SvgIcon
                component={isPlaying ? ZanTingIcon : BoFangIcon}
                inheritViewBox
                sx={{ fontSize: 42 }}
              />
            </IconButton>
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
