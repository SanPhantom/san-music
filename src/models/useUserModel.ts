import { useMemoizedFn, useMount, useSetState } from "ahooks";
import { createGlobalStore } from "hox";
import { setLocalItem } from "../config/localforage.config";
import { loginStatus, loginByVisitor } from "../services/user.service";

type UserStateType = {
  isLogin: boolean;
  isAnonymous: boolean;
  userInfo: {
    avatar?: string;
    nickname?: string;
    id: string;
  } | null;
  cookie?: string;
};

export const [useUserModel, getUserModel] = createGlobalStore(() => {
  const [user, updateUser] = useSetState<UserStateType>({
    isLogin: false,
    isAnonymous: false,
    userInfo: null,
    cookie: undefined,
  });

  const updateLoginStatus = useMemoizedFn(async () => {
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
  });

  return {
    user,
    updateUser,
    updateLoginStatus,
  };
});
