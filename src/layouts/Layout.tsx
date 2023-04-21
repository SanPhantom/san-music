import {
  alpha,
  AppBar,
  Box,
  Container,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import MusicMiniPlayer from "../components/music/MusicMiniPlayer";
import UserInfo from "../components/UserInfo";
import "./layout.less";
import LayoutSide from "./LayoutSide";
import { useMusicModel } from "../models/useMusicModel";
import SearchInput from "../components/common/SearchInput";
import { Email } from "@mui/icons-material";

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
        <Toolbar sx={{ gap: 1.5 }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            fontWeight={600}
            fontSize={24}
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            San Music
          </Typography>
          <SearchInput />
          <IconButton color="inherit">
            <Email color="inherit" />
          </IconButton>
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
            {currentSongId !== null && <MusicMiniPlayer />}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Layout;
