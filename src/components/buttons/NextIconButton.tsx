import { IconButton, SvgIcon } from "@mui/material";

import { ReactComponent as NextMusicIcon } from "../../assets/icon/-xiayishou.svg";
import { usePlayerModel } from "../../models/usePlayerModel";

const NextIconButton = ({ size = 42 }: { size?: number }) => {
  const { nextMusic } = usePlayerModel((store) => [store.nextMusic]);
  return (
    <IconButton sx={{ m: 0, p: 0, color: "inherit" }} onClick={nextMusic}>
      <SvgIcon
        component={NextMusicIcon}
        inheritViewBox
        sx={{ fontSize: size, color: "inherit" }}
      />
    </IconButton>
  );
};

export default NextIconButton;
