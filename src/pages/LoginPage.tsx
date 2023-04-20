import {
  alpha,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  useTheme,
} from "@mui/material";
import { EmailOutlined, QrCode } from "@mui/icons-material";

import React from "react";
import LoginTitle from "../components/login/LoginTitle";
import LoginByEmail from "../components/login/LoginByEmail";
import LoginBg from "../components/login/LoginBg";
import { useSetState } from "ahooks";
import LoginByQRCode from "../components/login/LoginByQRCode";

const LoginPage = () => {
  const theme = useTheme();

  const [state, setState] = useSetState({
    isCode: false,
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        fontSize: 0,
      }}
    >
      <LoginBg />
      <Stack alignItems={"center"} sx={{ pt: 18 }}>
        <Paper
          component={Stack}
          elevation={1}
          divider={<Divider sx={{ mx: -2 }} />}
          sx={{
            p: 2,
            maxWidth: 540,
            width: "100%",
            bgcolor: alpha(theme.palette.common.white, 1),
            gap: 2,
          }}
        >
          <LoginTitle />

          <Stack sx={{ gap: 2 }}>
            <Stack minHeight={200}>
              {state.isCode ? <LoginByQRCode /> : <LoginByEmail />}
            </Stack>

            <Button
              variant="text"
              startIcon={state.isCode ? <EmailOutlined /> : <QrCode />}
              onClick={() => setState({ isCode: !state.isCode })}
            >
              {state.isCode ? "邮箱登录" : "二维码登录"}
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

export default LoginPage;
