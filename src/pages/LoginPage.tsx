import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { QrCode, VisibilityOff } from "@mui/icons-material";
import React from "react";

interface ILoginPageProps {}

const LoginPage = () => {
  const theme = useTheme();
  return (
    <Stack alignItems={"center"} sx={{ pt: 18 }}>
      <Paper elevation={1} sx={{ p: 2, maxWidth: 540, width: "100%" }}>
        <Stack width={"100%"} spacing={2}>
          <Stack>
            <Typography
              variant="h5"
              fontWeight={700}
              color={theme.palette.primary.main}
            >
              San Music World
            </Typography>
            <Typography color={"text.secondary"}>self music player</Typography>
          </Stack>

          <Divider sx={{ width: "100%" }} />

          <Stack sx={{ minHeight: 240 }} spacing={2}>
            <FormControl>
              <InputLabel htmlFor="outlined-adornment-password">
                Email
              </InputLabel>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">@163.com</InputAdornment>
                }
                label="Email"
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                type={"password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      <VisibilityOff />
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              variant="contained"
              size="large"
              sx={{ color: theme.palette.common.white }}
            >
              Sign In
            </Button>
            <Button variant="text" startIcon={<QrCode />}>
              二维码登录
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default LoginPage;
