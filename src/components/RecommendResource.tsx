import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Stack, Typography, Box, Avatar, IconButton } from "@mui/material";
import { useCreation, useMemoizedFn, useSetState } from "ahooks";
import React, { useRef } from "react";
import { useUserModel } from "../models/useUserModel";
import { getRecommendPlaylist } from "../services/playlist.service";
import EllipsisText from "./common/EllipsisText/EllipsisText";
import { useNavigate } from "react-router-dom";

interface IRecommendResourceProps {}

const RecommendResource = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const containerWidth =
    containerRef.current?.getBoundingClientRect().width ?? 0;
  const listWidth = listRef.current?.getBoundingClientRect().width ?? 0;

  const { user } = useUserModel();
  const uid = useCreation(() => user.userInfo?.id, [user]);
  const [state, setState] = useSetState({
    list: [] as any[],
  });

  const next = useMemoizedFn(() => {
    const currentScrollLeft = containerRef.current?.scrollLeft ?? 0;
    containerRef.current?.scrollTo({
      left: currentScrollLeft + containerWidth,
      behavior: "smooth",
    });
  });

  const prev = useMemoizedFn(() => {
    const currentScrollLeft = containerRef.current?.scrollLeft ?? 0;
    containerRef.current?.scrollTo({
      left: currentScrollLeft - containerWidth,
      behavior: "smooth",
    });
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
    <Stack spacing={2}>
      <Stack
        direction={"row"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Typography variant="h6" fontWeight={600}>
          推荐歌单
        </Typography>
        <Stack direction={"row"} alignItems="center" spacing={2}>
          <IconButton
            sx={{ boxShadow: (theme) => theme.shadows[1] }}
            color="primary"
            size="small"
            onClick={prev}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            sx={{ boxShadow: (theme) => theme.shadows[1] }}
            color="primary"
            size="small"
            onClick={next}
          >
            <ChevronRight />
          </IconButton>
        </Stack>
      </Stack>
      <Box
        ref={containerRef}
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
        <Stack direction={"row"} spacing={2} ref={listRef}>
          {state.list.map((item) => (
            <Stack
              key={item.id}
              spacing={1}
              sx={{ width: 180 }}
              onClick={() => navigate(`/playlist/${item.id}`)}
            >
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
