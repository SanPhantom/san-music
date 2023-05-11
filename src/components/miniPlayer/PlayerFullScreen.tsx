import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogProps,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import { useMusicModel } from "../../models/useMusicModel";
import BlurImage from "../common/Image/BlurImage";
import MusicRecord from "../music/MusicRecord";
import MusicControl from "../music/MusicControl";
import MusicLyric from "../music/MusicLyric";

const SlideTransition = forwardRef(function Transition(
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
      <Box sx={{ height: "100%", position: "relative" }}>
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
          <Toolbar sx={{ position: "relative" }}>
            <IconButton
              onClick={(e) => props?.onClose?.(e, "backdropClick")}
              color="inherit"
              sx={{ position: "relative", zIndex: 1 }}
            >
              <KeyboardArrowDown fontSize="large" color="inherit" />
            </IconButton>
            <Stack
              sx={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                left: 0,
                top: 0,
                px: 12,
                gap: 0.5,
              }}
            >
              <Typography variant="body1" fontWeight={600}>
                {musicInfo?.name}
              </Typography>
              <Typography variant="body2">{musicInfo?.art}</Typography>
            </Stack>
          </Toolbar>
          <Box sx={{ flex: 1, overflow: "auto" }}>
            <Stack
              sx={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                flexDirection: "row",
              }}
            >
              <MusicRecord />
              <MusicLyric />
            </Stack>
          </Box>
          <Stack sx={{ height: 120 }}>
            <MusicControl />
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default PlayerFullScreen;
