import {
  alpha,
  Box,
  CardContent,
  Divider,
  Drawer,
  Stack,
  Toolbar,
} from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCreation } from "ahooks";
import menus from "../config/menu.config";
import UserPlaylist from "../components/UserPlaylist";

interface ILayoutSideProps {}

const LayoutSide = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Stack
        sx={{ flex: 1, display: "flex", minHeight: 0, flexDirection: "column" }}
      >
        <Stack p={2} spacing={1}>
          {menus.map((menu, index) => {
            return (
              <Link to={menu.path}>
                <CardContent
                  sx={{
                    px: 2,
                    py: 1,
                    backgroundColor: (theme) =>
                      alpha(
                        theme.palette.primary.main,
                        location.pathname === menu.path ? 1 : 0
                      ),
                    color: (theme) =>
                      theme.palette.common[
                        location.pathname === menu.path ? "white" : "black"
                      ],
                    borderRadius: 1,
                    cursor: "pointer",
                    ["&:last-child"]: {
                      pb: 1,
                    },
                    ["&:hover"]: {
                      backgroundColor: (theme) =>
                        alpha(theme.palette.primary.main, 0.5),
                    },
                    transition: "background-color 0.5s",
                  }}
                >
                  {menu.title}
                </CardContent>
              </Link>
            );
          })}
        </Stack>
        <Divider />
        <Stack
          sx={{
            flex: 1,
            minHeight: 0,
            overflow: "auto",
            py: 2,
            ["&::-webkit-scrollbar"]: {
              width: 4,
            },
            ["&::-webkit-scrollbar-thumb"]: {
              width: 4,
              background: (theme) => theme.palette.primary.main,
              borderRadius: 2,
            },
          }}
        >
          <UserPlaylist />
        </Stack>
      </Stack>
      <Box sx={{ width: "100%", height: 45 }} />
    </Drawer>
  );
};

export default LayoutSide;
