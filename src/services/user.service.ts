import musicAxios from "../config/axios.config";

export interface LoginByPhone {
  phone: string;
  md5_password?: string;
  captcha?: string;
}
export interface LoginByEmail {
  email: string;
  md5_password?: string;
}

// 手机号登录
export const loginByPhone = (data: LoginByPhone) => {
  return musicAxios.post("/login/cellphone", {
    ...data,
  });
};

export const sentCaptcha = (phone: string) => {
  return musicAxios.post("/captcha/sent", {
    phone: phone,
  });
};

export const loginByEmail = (data: LoginByEmail) => {
  return musicAxios.post("/login", {
    ...data,
  });
};

// 游客登录
export const loginByVisitor = () => {
  return musicAxios.post<any, any>("/register/anonimous");
};

// 登陆状态
export const loginStatus = () => {
  return musicAxios.get(
    `/login/status?timestamp=${new Date().getTime()}&realIP=116.25.146.177`
  );
};

export const logout = () => {
  return musicAxios.get("/logout");
};

export const getUserDetail = (userId: string) => {
  return musicAxios.get("/user/detail", {
    params: {
      uid: userId,
    },
  });
};

export const getUserVipInfo = () => {
  return musicAxios.get("/vip/info");
};

export const getUserPlaylist = (userId: string, offset: number = 0) => {
  return musicAxios.get("/user/playlist", {
    params: {
      uid: userId,
      offset: offset * 30,
    },
  });
};
