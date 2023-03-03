import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.less";
import Layout from "./layouts/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}

export default App;
