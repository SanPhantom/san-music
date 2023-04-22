import { Avatar, Divider, Stack, Typography } from "@mui/material";
import {
  useCreation,
  useInterval,
  useLockFn,
  useMemoizedFn,
  useSetState,
} from "ahooks";
import QRCodeCanvas from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { setLocalItem } from "../../config/localforage.config";
import { useUserModel } from "../../models/useUserModel";
import {
  checkQRLoginStatus,
  generateLoginCode,
  generateLoginKey,
} from "../../services/common.service";

const LoginByQRCode = () => {
  const navigate = useNavigate();
  const [state, setState] = useSetState({
    key: null,
    qrUrl: null,
    confirmInfo: null as { nickname: string; avatar: string } | null,
  });

  const { updateLoginStatus } = useUserModel((store) => [
    store.updateLoginStatus,
  ]);

  const generateKey = useMemoizedFn(async () => {
    const { data } = await generateLoginKey();
    setState({
      qrUrl: null,
      confirmInfo: null,
      key: data.unikey,
    });
  });

  const generateCode = useMemoizedFn(async () => {
    const { data } = await generateLoginCode({ key: state.key });
    setState({
      qrUrl: data.qrurl,
    });
  });

  const checkStatus = useLockFn(async () => {
    if (state.key && state.qrUrl) {
      const res = await checkQRLoginStatus({ key: state.key });
      switch (res.code) {
        case 800:
          await generateKey();
          break;
        case 801:
          break;
        case 802:
          setState({
            confirmInfo: {
              nickname: res.nickname,
              avatar: res.avatarUrl,
            },
          });
          break;
        case 803:
          setLocalItem("m_cookie", res.cookie);
          updateLoginStatus();
          navigate("/");
          clear();
          break;
        default:
      }
    }
  });

  const clear = useInterval(() => {
    checkStatus();
  }, 500);

  useCreation(async () => {
    if (state.key) {
      generateCode();
    } else {
      generateKey();
    }
  }, [state.key]);

  return (
    <Stack>
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          minHeight: 200,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {state.qrUrl && !state.confirmInfo && (
          <QRCodeCanvas value={state.qrUrl} size={168} />
        )}
        {state.confirmInfo && (
          <Stack spacing={1} alignItems="center">
            <Avatar
              src={state.confirmInfo.avatar}
              sx={{ width: 48, height: 48 }}
            />
            <Typography variant="body2">
              {state.confirmInfo.nickname}
            </Typography>
          </Stack>
        )}
      </Stack>
      <Divider />
    </Stack>
  );
};

export default LoginByQRCode;
