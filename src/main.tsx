import { createTheme, ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/router";
import { HoxRoot } from "hox";
import "./index.css";
import "./animation.css";

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
