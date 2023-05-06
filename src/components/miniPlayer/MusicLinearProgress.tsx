import { LinearProgress } from "@mui/material";
import { usePlayerModel } from "../../models/usePlayerModel";
import { useMusicModel } from "../../models/useMusicModel";

const MusicLinearProgress = () => {
  const { currentTime } = usePlayerModel((store) => [store.currentTime]);
  const { duration } = useMusicModel((store) => [store.duration]);
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
