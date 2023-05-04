import axios from "axios";
import { getLocalItem } from "./localforage.config";
import { readCookieKey } from "../utils/cookie";

const request = axios.create({
  baseURL: "https://musicapi.onephantom.cn/",
  timeout: 100000,
  withCredentials: true,
  headers: {},
});

request.interceptors.request.use(async (config) => {
  const { method } = config;
  const cookie = await getLocalItem("m_cookie");
  switch (method && method.toUpperCase()) {
    case "GET":
      config.data = true;
      config.params = {
        ...config.params,
        cookie: encodeURIComponent(
          `MUSIC_U=${
            readCookieKey(cookie, "MUSIC_U") ?? readCookieKey(cookie, "MUSIC_A")
          };`
        ),
      };

      break;
    case "POST":
      config.params = {
        ...config.params,
        timestamp: new Date().getTime(),
        realIP: "116.25.146.177",
      };
      break;
    default:
      console.log("axios request error");
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    }
    return Promise.resolve<any>(response.data);
  },
  (error) => {
    if (error && error.response) {
      const data = error.response.data;
      if (data.code === 301) {
        console.log(data.msg);
      }
    } else {
      error.message = "连接服务器失败";
    }

    return Promise.reject(error);
  }
);

export default request;
