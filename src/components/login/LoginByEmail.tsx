import { VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  useTheme,
} from "@mui/material";

const LoginByEmail = () => {
  const theme = useTheme();

  return (
    <Stack spacing={2}>
      <FormControl>
        <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
        <OutlinedInput
          endAdornment={
            <InputAdornment position="end">@163.com</InputAdornment>
          }
          label="Email"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          type={"password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" edge="end">
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
    </Stack>
  );
};

export default LoginByEmail;
