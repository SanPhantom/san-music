import React from "react";
import { usePlayerModel } from "../../models/usePlayerModel";
import { IconButton, SvgIcon } from "@mui/material";

import { ReactComponent as BoFangIcon } from "../../assets/icon/-bofang.svg";
import { ReactComponent as ZanTingIcon } from "../../assets/icon/-zanting.svg";

const PlayController = () => {
  const { player, isPlaying } = usePlayerModel();

  return (
    <IconButton
      sx={{ m: 0, p: 0 }}
      onClick={() => {
        if (isPlaying) {
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
  );
};

export default PlayController;
