import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { useBoolean } from "ahooks";
import { useForm, Controller } from "react-hook-form";
import { loginByEmail } from "../../services/user.service";
import md5 from "js-md5";

const LoginByEmail = () => {
  const theme = useTheme();

  const { handleSubmit, control } = useForm();

  const [isVisible, { toggle: toggleVisible }] = useBoolean(false);

  const handleFinish = useCallback(async (values: Record<string, any>) => {
    const params = {
      ...values,
      email: `${values.email}@163.com`,
      password: values.password,
      md5_password: md5(values.password),
    };
    console.log({ params });

    const res = await loginByEmail(params);
    console.log(res);
  }, []);

  return (
    <form onSubmit={handleSubmit(handleFinish)}>
      <Stack spacing={2}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              label="Email"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">@163.com</InputAdornment>
                ),
              }}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              label="Password"
              type={isVisible ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={toggleVisible}
                    >
                      {isVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...field}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ color: theme.palette.common.white }}
        >
          Sign In
        </Button>
      </Stack>
    </form>
  );
};

export default LoginByEmail;
