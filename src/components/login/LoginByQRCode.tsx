import { Avatar, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import QRCodeCanvas from "qrcode.react";
import {
  useCreation,
  useInterval,
  useLockFn,
  useMemoizedFn,
  useSetState,
} from "ahooks";
import {
  checkQRLoginStatus,
  generateLoginCode,
  generateLoginKey,
} from "../../services/common.service";
import { useUserModel } from "../../models/useUserModel";
import { setLocalItem } from "../../config/localforage.config";

const LoginByQRCode = () => {
  const [state, setState] = useSetState({
    key: null,
    qrUrl: null,
    confirmInfo: null as { nickname: string; avatar: string } | null,
  });

  const { updateLoginStatus } = useUserModel();

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
