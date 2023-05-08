import { IconButton, SvgIcon } from "@mui/material";

import { ReactComponent as PrevMusicIcon } from "../../assets/icon/-shangyishou.svg";
import { usePlayerModel } from "../../models/usePlayerModel";

const PrevIconButton = ({ size = 42 }: { size?: number }) => {
  const { prevMusic } = usePlayerModel((store) => [store.prevMusic]);
  return (
    <IconButton sx={{ m: 0, p: 0, color: "inherit" }} onClick={prevMusic}>
      <SvgIcon
        component={PrevMusicIcon}
        inheritViewBox
        sx={{ fontSize: size, color: "inherit" }}
      />
    </IconButton>
  );
};

export default PrevIconButton;
