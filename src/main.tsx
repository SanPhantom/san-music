import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.less";
import routes from "./routes/router";
import { HoxRoot } from "hox";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4c8045",
    },
  },
  typography: {
    fontFamily: ["serif"].join(","),
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
      <RouterProvider router={routes} />
    </HoxRoot>
  </ThemeProvider>
  // </React.StrictMode>
);
