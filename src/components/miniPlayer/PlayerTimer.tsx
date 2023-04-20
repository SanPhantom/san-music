import React from "react";
import { usePlayerModel } from "../../models/usePlayerModel";
import { transTime } from "../../utils";
import { Typography } from "@mui/material";

const PlayerTimer = () => {
  const { currentTime, duration } = usePlayerModel();
  return (
    <Typography variant="caption" color={"text.secondary"}>{`${transTime(
      currentTime
    )} / ${transTime(duration)}`}</Typography>
  );
};

export default PlayerTimer;
