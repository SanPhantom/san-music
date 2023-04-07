import {
  Box,
  Container,
  IconButton,
  LinearProgress,
  Stack,
  SvgIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { usePlayerModel } from "../../models/usePlayerModel";
import { ReactComponent as BoFangIcon } from "../../assets/icon/-bofang.svg";
import { ReactComponent as NextMusicIcon } from "../../assets/icon/-xiayishou.svg";
import { ReactComponent as ZanTingIcon } from "../../assets/icon/-zanting.svg";

interface IMusicMiniPlayerProps {}

const MusicMiniPlayer = () => {
  const { currentTime, duration, player, isPlaying } = usePlayerModel();

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
      <Container sx={{ height: "100%" }}>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Typography>123</Typography>
          <Stack direction={"row"} spacing={1.5}>
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
      </Container>
    </Toolbar>
  );
};

export default MusicMiniPlayer;
