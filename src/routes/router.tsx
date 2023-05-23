import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import LazyComponent from "./LazyComponent";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <LazyComponent pageId="ErrorPage" />,
    shouldRevalidate: ({ currentUrl }) => {
      return currentUrl.pathname === "/user";
    },
    children: [
      { path: "/", element: <Navigate to={"/music"} replace /> },
      { path: "/user", element: "clear", id: "user" },
      {
        path: "/music",
        element: <LazyComponent pageId="FindMusicPage" />,
        id: "music",
      },
      { path: "/video", element: "video", id: "video" },
      {
        path: "/playlist/:id",
        element: <LazyComponent pageId="PlaylistPage" />,
        id: "playlist",
      },
      {
        path: "/profile",
        element: <LazyComponent pageId="ProfilePage" />,
        id: "profile",
      },
      {
        path: "/search",
        element: <LazyComponent pageId="SearchPage" autoHeight={false} />,
        id: "search",
      },
    ],
  },
  {
    path: "/login",
    element: <LazyComponent pageId="LoginPage" />,
    errorElement: <LazyComponent pageId="ErrorPage" />,
  },
]);

export default routes;
