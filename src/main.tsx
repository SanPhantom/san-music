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
      main: "#20c997",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "serif",
      "sans-serif",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
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
