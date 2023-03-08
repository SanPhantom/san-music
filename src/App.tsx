import { CssBaseline } from "@mui/material";
import { useMount } from "ahooks";
import { Outlet } from "react-router-dom";
import "./App.less";
import { setLocalItem } from "./config/localforage.config";
import Layout from "./layouts/Layout";
import { loginByVisitor, loginStatus } from "./services/user.service";

function App() {
  useMount(async () => {
    const { data } = await loginStatus();
    console.log({ data });
    if (!data.account.anonimousUser && !data.profile) {
      console.log("no Data");
      const anonymousUser = await loginByVisitor();
      setLocalItem("m_cookie", anonymousUser.cookie);
      console.log({ anonymousUser });
    }
  });

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
