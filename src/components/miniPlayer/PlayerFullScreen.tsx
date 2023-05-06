import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogProps,
  Divider,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
  alpha,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import React from "react";
import MusicLyric from "../music/MusicLyric";
import { useMusicModel } from "../../models/useMusicModel";
import BlurImage from "../common/Image/BlurImage";

const SlideTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PlayerFullScreen = (props: DialogProps) => {
  const { musicInfo } = useMusicModel((state) => [state.musicInfo]);
  return (
    <Dialog fullScreen TransitionComponent={SlideTransition} {...props}>
      <Stack sx={{ height: "100%", position: "relative" }}>
        <BlurImage
          src={musicInfo?.targetPic}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 0,
            objectFit: "cover",
          }}
        />
        <Stack
          sx={{ height: "100%", position: "relative", color: "common.white" }}
        >
          <Toolbar>
            <IconButton
              onClick={(e) => props?.onClose?.(e, "backdropClick")}
              color="inherit"
            >
              <KeyboardArrowDown fontSize="large" color="inherit" />
            </IconButton>
            <Typography>Component Header</Typography>
          </Toolbar>
          <Divider
            sx={{
              borderColor: (theme) => alpha(theme.palette.common.white, 0.2),
            }}
          />
          <Box sx={{ flex: 1, overflow: "auto" }}>
            <Stack
              sx={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
              }}
            >
              <MusicLyric />
            </Stack>
          </Box>
          <Box sx={{ height: 80 }}></Box>
          <Divider
            sx={{
              borderColor: (theme) => alpha(theme.palette.common.white, 0.2),
            }}
          />
          <Stack sx={{ height: 120 }}></Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default PlayerFullScreen;
