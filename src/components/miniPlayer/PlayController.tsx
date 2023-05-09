import { IconButton, SvgIcon } from "@mui/material";
import { usePlayerModel } from "../../models/usePlayerModel";

import { ReactComponent as BoFangIcon } from "../../assets/icon/-bofang.svg";
import { ReactComponent as ZanTingIcon } from "../../assets/icon/-zanting.svg";
import { isEmpty } from "ramda";

const PlayController = ({ size = 42 }: { size?: number }) => {
  const { player, isPlaying } = usePlayerModel((store) => [
    store.player,
    store.isPlaying,
  ]);

  return (
    <IconButton
      sx={{ m: 0, p: 0, color: "inherit" }}
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
        sx={{ fontSize: size, color: "inherit" }}
      />
    </IconButton>
  );
};

export default PlayController;
