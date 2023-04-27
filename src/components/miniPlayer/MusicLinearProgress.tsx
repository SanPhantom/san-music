import { LinearProgress } from "@mui/material";
import { usePlayerModel } from "../../models/usePlayerModel";

const MusicLinearProgress = () => {
  const { currentTime, duration } = usePlayerModel((store) => [
    store.currentTime,
    store.duration,
  ]);
  return (
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
  );
};

export default MusicLinearProgress;