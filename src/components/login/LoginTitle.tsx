import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";

interface ILoginTitleProps {}

const LoginTitle = () => {
  const theme = useTheme();
  return (
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
  );
};

export default LoginTitle;
