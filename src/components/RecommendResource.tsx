import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Avatar, Box, Chip, IconButton, Stack, alpha } from "@mui/material";
import { useCreation, useMemoizedFn, useRequest } from "ahooks";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserModel } from "../models/useUserModel";
import { getRecommendPlaylist } from "../services/playlist.service";
import { formatImageSize } from "../utils";
import EllipsisText from "./common/EllipsisText/EllipsisText";
import LoadingView from "./common/LoadingView";
import Title from "./common/Title";
import PlaylistItem from "./ListItem/PlaylistItem";

interface IRecommendResourceProps {}

const RecommendResource = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data, run, loading } = useRequest(getRecommendPlaylist, {
    manual: true,
  });

  const containerWidth =
    containerRef.current?.getBoundingClientRect().width ?? 0;

  const { user } = useUserModel((store) => [store.user]);
  const uid = useCreation(() => user.userInfo?.id, [user]);

  const playlists = useCreation(() => {
    return data?.recommend ?? [];
  }, [data]);

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
      run();
    }
  }, [uid]);

  return (
    <Stack spacing={2}>
      <Stack
        direction={"row"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Title showTab label="推荐歌单" />

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
        <LoadingView loading={loading}>
          <Stack direction={"row"} spacing={2} ref={listRef}>
            {playlists.map((item: any) => (
              <PlaylistItem type="card" playlist={item} />
            ))}
          </Stack>
        </LoadingView>
      </Box>
    </Stack>
  );
};

export default RecommendResource;
