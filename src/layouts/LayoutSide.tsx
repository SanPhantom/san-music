import {
  CardContent,
  Divider,
  Drawer,
  Stack,
  Toolbar,
  alpha,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import menus from "../config/menu.config";

interface ILayoutSideProps {}

const LayoutSide = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 230,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 230, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Stack
        sx={{ flex: 1, display: "flex", minHeight: 0, flexDirection: "column" }}
      >
        <Stack sx={{ py: 2, px: 1.5 }}>
          <UserInfo />
        </Stack>
        <Divider />
        <Stack p={1.5} spacing={1}>
          {menus.map((menu, index) => {
            return (
              <Link to={menu.path} key={menu.title}>
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
      </Stack>
    </Drawer>
  );
};

export default LayoutSide;
