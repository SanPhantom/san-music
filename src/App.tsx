import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import "./App.css";
import Layout from "./layouts/Layout";

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <Layout>
          <Outlet />
        </Layout>
      </div>
    </>
  );
}

export default App;
