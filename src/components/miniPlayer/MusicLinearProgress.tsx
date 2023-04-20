import React from "react";
import { usePlayerModel } from "../../models/usePlayerModel";
import { LinearProgress } from "@mui/material";

interface IMusicLinearProgressProps {}

const MusicLinearProgress = () => {
  const { currentTime, duration } = usePlayerModel();
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
