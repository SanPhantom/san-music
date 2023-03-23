import musicAxios from "../config/axios.config";

export const banner = (data: { type: number }) => {
  return musicAxios.get<any, any>("/banner", {
    params: { ...data },
  });
};

export const generateLoginKey = () => {
  return musicAxios.post("/login/qr/key", {
    data: {
      timestamp: Date.now(),
    },
  });
};

export const generateLoginCode = (data: any) => {
  return musicAxios.get("/login/qr/create", {
    params: {
      timestamp: Date.now(),
      key: data.key,
    },
  });
};

export const checkQRLoginStatus = (data: any) => {
  return musicAxios.get<any, any>("/login/qr/check", {
    params: {
      timestamp: Date.now(),
      key: data.key,
    },
  });
};
