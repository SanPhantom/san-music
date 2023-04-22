import { IconButton, SvgIcon } from "@mui/material";
import { usePlayerModel } from "../../models/usePlayerModel";

import { ReactComponent as BoFangIcon } from "../../assets/icon/-bofang.svg";
import { ReactComponent as ZanTingIcon } from "../../assets/icon/-zanting.svg";
import { isEmpty } from "ramda";

const PlayController = () => {
  const { player, isPlaying } = usePlayerModel((store) => [
    store.player,
    store.isPlaying,
  ]);

  return (
    <IconButton
      sx={{ m: 0, p: 0 }}
      onClick={() => {
        if (isPlaying && !isEmpty(player)) {
          player?.pause();
        } else {
          player?.play();
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
