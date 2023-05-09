import { useMemoizedFn, useMount, useSetState } from "ahooks";
import { createGlobalStore } from "hox";
import { setLocalItem } from "../config/localforage.config";
import { loginByVisitor, loginStatus } from "../services/user.service";
import { getScreenFps } from "san-lyric";

type UserStateType = {
  isLogin: boolean;
  isAnonymous: boolean;
  userInfo: {
    avatar?: string;
    nickname?: string;
    id: string;
  } | null;
  cookie?: string;
  userFps: number;
};

export const [useUserModel, getUserModel] = createGlobalStore(() => {
  const [user, updateUser] = useSetState<UserStateType>({
    isLogin: false,
    isAnonymous: false,
    userInfo: null,
    cookie: undefined,
    userFps: 0,
  });

  const updateLoginStatus = useMemoizedFn(async () => {
    // const cookie = await getLocalItem("m_cookie");
    // const expires = readCookieKey(cookie, "Expires");
    // const music_u = readCookieKey(cookie, "MUSIC_U");
    // console.log({ expires, music_u });
    const { data } = await loginStatus();
    if (!data.account.anonimousUser && !data.profile) {
      const anonymousUser = await loginByVisitor();
      setLocalItem("m_cookie", anonymousUser.cookie);
      updateUser({
        isLogin: true,
        isAnonymous: true,
        userInfo: {
          id: anonymousUser.userId,
        },
      });
    } else if (!data.profile) {
      const { id, anonimousUser } = data.account;
      updateUser({
        isLogin: true,
        isAnonymous: anonimousUser,
        userInfo: {
          id: id,
        },
      });
    } else {
      // todo
      const { userId, avatarUrl, nickname } = data.profile;
      updateUser({
        isLogin: true,
        isAnonymous: false,
        userInfo: {
          id: userId,
          avatar: avatarUrl,
          nickname: nickname,
        },
      });
    }
  });

  useMount(async () => {
    await updateLoginStatus();
    const fps = await getScreenFps?.();
    updateUser({
      userFps: fps ?? 0,
    });
  });

  return {
    user,
    userFps: user.userFps,
    updateUser,
    updateLoginStatus,
  };
});
