import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import FindMusicPage from "../pages/FindMusicPage";
import LoginPage from "../pages/LoginPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    shouldRevalidate: ({ currentUrl }) => {
      return currentUrl.pathname === "/user";
    },
    children: [
      { path: "/", element: <Navigate to={"/music"} replace /> },
      { path: "/user", element: "clear", id: "user" },
      { path: "/music", element: <FindMusicPage />, id: "music" },
      { path: "/video", element: "video", id: "video" },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
]);

export default routes;
