import {
  alpha,
  AppBar,
  Box,
  Container,
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

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <Stack sx={{ width: "100%", height: "100%" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: (theme) => theme.palette.common.white,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color={"common.white"}
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            San Music World
          </Typography>
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
            <MusicMiniPlayer />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Layout;
