import { Avatar, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserModel } from "../models/useUserModel";

interface IUserInfoProps {}

const UserInfo = () => {
  const navigate = useNavigate();
  const { user } = useUserModel();
  const { isLogin, isAnonymous, userInfo } = user;
  const noLogin = !isLogin || isAnonymous;
  return (
    <div>
      {noLogin ? (
        <Button
          color="inherit"
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign In
        </Button>
      ) : (
        <Stack direction={"row"} alignItems="center" spacing={1}>
          <Avatar src={userInfo?.avatar} />
          <Typography variant="body2" fontWeight={600}>
            {userInfo?.nickname}
          </Typography>
        </Stack>
      )}
    </div>
  );
};

export default UserInfo;
