import { Email } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchInput from "../components/common/SearchInput";
import MusicMiniPlayer from "../components/music/MusicMiniPlayer";
import { useMusicModel } from "../models/useMusicModel";
import "./layout.less";
import LayoutSide from "./LayoutSide";

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
        <Toolbar
          sx={{ gap: 1.5, justifyContent: "space-between" }}
          data-tauri-drag-region="self"
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            fontWeight={600}
            fontSize={24}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            San Music
          </Typography>
          <Stack sx={{ flexDirection: "row" }}>
            <SearchInput />
            <IconButton color="inherit">
              <Email color="inherit" />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Stack sx={{ flexGrow: 1, height: "100%" }}>
        <Toolbar />
        <Stack direction={"row"} sx={{ flex: 1, width: "100%", minHeight: 0 }}>
          <LayoutSide />
          <Stack sx={{ flexGrow: 1, minWidth: 0, height: "100%" }}>
            <Box component={"main"} sx={{ flex: 1, overflow: "auto", py: 2 }}>
              <Container>{children}</Container>
            </Box>
            {currentSongId && <MusicMiniPlayer />}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Layout;
