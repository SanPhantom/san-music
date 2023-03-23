import { Stack, Typography, Box, Avatar } from "@mui/material";
import { useCreation, useSetState } from "ahooks";
import React from "react";
import { useUserModel } from "../models/useUserModel";
import { getRecommendPlaylist } from "../services/playlist.service";
import EllipsisText from "./common/EllipsisText/EllipsisText";

interface IRecommendResourceProps {}

const RecommendResource = () => {
  const { user } = useUserModel();
  const uid = useCreation(() => user.userInfo?.id, [user]);
  const [state, setState] = useSetState({
    list: [] as any[],
  });

  useCreation(async () => {
    if (uid) {
      const { recommend } = await getRecommendPlaylist();
      setState({
        list: recommend,
      });
    }
  }, [uid]);

  return (
    <Stack spacing={1}>
      <Stack>
        <Typography variant="h6" fontWeight={600}>
          推荐歌单
        </Typography>
      </Stack>
      <Box
        sx={{
          minHeight: 120,
          overflow: "auto",
          ["&::-webkit-scrollbar"]: {
            height: 0,
          },
          ["&::-webkit-scrollbar-thumb"]: {
            height: 4,
            background: (theme) => theme.palette.primary.main,
            borderRadius: 2,
          },
        }}
      >
        <Stack direction={"row"} spacing={2}>
          {state.list.map((item) => (
            <Stack key={item.id} spacing={0.5} sx={{ width: 180 }}>
              <Avatar
                src={item.picUrl}
                variant="rounded"
                sx={{
                  width: 168,
                  height: 168,
                  boxShadow: (theme) => theme.shadows[1],
                }}
              ></Avatar>
              <EllipsisText line={2} variant={"body2"}>
                {item.name}
              </EllipsisText>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default RecommendResource;
