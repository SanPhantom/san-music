import { ArrowBack } from "@mui/icons-material";
import { IconButton, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginTitle = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Stack direction={"row"} alignItems={"center"} spacing={2}>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBack />
      </IconButton>
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
    </Stack>
  );
};

export default LoginTitle;
