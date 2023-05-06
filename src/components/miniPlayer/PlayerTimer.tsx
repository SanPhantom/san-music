import { Typography } from "@mui/material";
import { usePlayerModel } from "../../models/usePlayerModel";
import { transTime } from "../../utils";
import { useMusicModel } from "../../models/useMusicModel";

const PlayerTimer = () => {
  const { currentTime } = usePlayerModel((store) => [store.currentTime]);
  const { duration } = useMusicModel((store) => [store.duration]);
  return (
    <Typography variant="caption" color={"text.secondary"}>{`${transTime(
      currentTime
    )} / ${transTime(duration)}`}</Typography>
  );
};

export default PlayerTimer;
