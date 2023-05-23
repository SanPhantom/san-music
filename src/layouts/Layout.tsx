import { AppBar, Stack, Toolbar } from "@mui/material";
import MusicMiniPlayer from "../components/music/MusicMiniPlayer";
import { useMusicModel } from "../models/useMusicModel";
import LayoutHead from "./LayoutHead";
import LayoutSide from "./LayoutSide";
import "./layout.less";

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const { currentSongId } = useMusicModel((store) => [store.currentSongId]);

  return (
    <Stack sx={{ width: "100%", height: "100%" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <LayoutHead />
      </AppBar>
      <Stack sx={{ flexGrow: 1, height: "100%" }}>
        <Toolbar />
        <Stack direction={"row"} sx={{ flex: 1, width: "100%", minHeight: 0 }}>
          <LayoutSide />
          <Stack sx={{ flexGrow: 1, minWidth: 0, height: "100%" }}>
            <Stack sx={{ flex: 1, overflow: "auto" }}>{children}</Stack>
            {currentSongId && <MusicMiniPlayer />}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Layout;
