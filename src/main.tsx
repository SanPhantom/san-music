import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.less";
import routes from "./routes/router";
import { HoxRoot } from "hox";
import { PlayerStoreProvider } from "./models/usePlayerModel";

const theme = createTheme({
  palette: {
    primary: {
      main: "#20c997",
    },
  },
  typography: {
    fontFamily: [].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <HoxRoot>
      <PlayerStoreProvider>
        <RouterProvider router={routes} />
      </PlayerStoreProvider>
    </HoxRoot>
  </ThemeProvider>
  // </React.StrictMode>
);
