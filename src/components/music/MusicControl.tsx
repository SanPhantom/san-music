import { Slider, Stack, Typography, alpha, useTheme } from "@mui/material";
import { useBoolean } from "ahooks";
import { useMusicModel } from "../../models/useMusicModel";
import { usePlayerModel } from "../../models/usePlayerModel";
import { transTime } from "../../utils";
import NextIconButton from "../buttons/NextIconButton";
import PrevIconButton from "../buttons/PrevIconButton";
import PlayController from "../miniPlayer/PlayController";

interface IMusicControlProps {}

const MusicControl = () => {
  const { currentTime, player } = usePlayerModel((state) => [
    state.currentTime,
    state.player,
  ]);
  const { duration } = useMusicModel((store) => [store.duration]);

  const theme = useTheme();

  const [slideData, setSlideData] = useState(0);
  const [isLockSlide, { setTrue: locked, setFalse: unlocked }] =
    useBoolean(false);

  return (
    <Stack sx={{ p: 2, gap: 1 }}>
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
        <Typography variant="body2">{transTime(currentTime)}</Typography>
        <Stack
          sx={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Slider
            aria-label="time-indicator"
            size="small"
            value={isLockSlide ? slideData : currentTime}
            min={0}
            step={1}
            max={duration}
            onChange={(_, value) => {
              if (!isLockSlide) locked();
              setSlideData(value as number);
            }}
            onChangeCommitted={(_, value) => {
              player.currentTime = (value as number) / 1000;
              if (isLockSlide) unlocked();
            }}
            sx={{
              color: theme.palette.primary.main,
              height: 4,
              p: `0 !important`,
              "& .MuiSlider-thumb": {
                width: 8,
                height: 8,
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                "&:before": {
                  boxShadow: "0 2px 12px 0 rgba(255,255,255,0.4)",
                },
                "&.Mui-focusVisible": {
                  boxShadow: `0px 0px 0px 8px ${alpha(
                    theme.palette.primary.main,
                    0.16
                  )}`,
                },
                "&.Mui-active": {
                  width: 12,
                  height: 12,
                },
              },
              "& .MuiSlider-rail": {
                backgroundColor: (theme) => theme.palette.common.white,
                opacity: 0.28,
              },
              "& .MuiSlider-track": {
                background: (theme) =>
                  `linear-gradient(135deg, #81fbb8, ${theme.palette.primary.main})`,
              },
            }}
          />
        </Stack>
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
