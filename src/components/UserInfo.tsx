import { ChevronRight } from "@mui/icons-material";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserModel } from "../models/useUserModel";

const UserInfo = () => {
  const navigate = useNavigate();
  const { user } = useUserModel((store) => [store.user]);
  const { isLogin, isAnonymous, userInfo } = user;
  const noLogin = !isLogin || isAnonymous;
  return (
    <Box>
      <Stack
        direction={"row"}
        alignItems="center"
        spacing={1}
        justifyContent={"space-between"}
        sx={{ cursor: "pointer", userSelect: "none" }}
        onClick={() => {
          if (noLogin) {
            navigate("/login");
            return;
          }
          navigate("/profile");
        }}
      >
        <Stack direction={"row"} alignItems="center" spacing={1}>
          <Avatar src={noLogin ? undefined : userInfo?.avatar} />
          <Typography variant="body2">
            {noLogin ? "登录/注册" : userInfo?.nickname}
          </Typography>
        </Stack>

        <ChevronRight />
      </Stack>
    </Box>
  );
};

export default UserInfo;
