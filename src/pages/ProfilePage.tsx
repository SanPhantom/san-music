import { Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import { useCreation, useLatest, useRequest } from "ahooks";
import { useUserModel } from "../models/useUserModel";
import { getUserDetail } from "../services/user.service";

const ProfilePage = () => {
  const { user } = useUserModel((store) => [store.user]);
  const uidRef = useLatest(user.userInfo?.id);

  const {
    data: userDetail,
    run: requestUserDetail,
    loading,
  } = useRequest(getUserDetail, {
    manual: true,
  });

  useCreation(() => {
    console.log({ userDetail });
  }, [userDetail]);

  useCreation(() => {
    if (uidRef.current) {
      requestUserDetail(uidRef.current);
    }
  }, [uidRef.current]);

  return (
    <Stack spacing={1.5}>
      <Paper sx={{ p: 2, pt: 6, mt: 6 }}></Paper>
      <Paper sx={{ p: 2, pt: 0 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={"created"}>
            <Tab label="创建的歌单" value={"created"} />
            <Tab label="收藏的歌单" value={"collected"} />
          </Tabs>
        </Box>
      </Paper>
    </Stack>
  );
};

export default ProfilePage;
