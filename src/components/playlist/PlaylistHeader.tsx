import { Share, Queue } from "@mui/icons-material";
import { Stack, Box, Avatar, Chip, Typography } from "@mui/material";
import React from "react";
import { formatImageSize } from "../../utils";
import EllipsisText from "../common/EllipsisText/EllipsisText";
import { isEmpty } from "ramda";

interface IPlaylistHeaderProps {
  info: any;
}

const PlaylistHeader = ({ info }: IPlaylistHeaderProps) => {
  return (
    <Stack spacing={1}>
      <Stack
        spacing={2}
        direction={"row"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        sx={{ width: "100%" }}
      >
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={formatImageSize(info?.coverImgUrl, 168)}
            sx={{ width: 168, height: 168 }}
            alt=""
            variant="rounded"
          />
        </Box>
        <Stack
          spacing={1.5}
          justifyContent={"space-between"}
          sx={{ height: 168, py: 0.5 }}
        >
          <Stack spacing={1.5}>
            <EllipsisText
              variant="body1"
              fontWeight={600}
              line={2}
              fontSize={18}
            >
              {info?.name}
            </EllipsisText>
            <Stack sx={{ flexDirection: "row", gap: 1 }}>
              <Avatar
                src={formatImageSize(info?.creator?.avatarUrl, 24)}
                sx={{
                  width: 24,
                  height: 24,
                  boxShadow: (theme) => theme.shadows[1],
                }}
              />
              <EllipsisText variant="body2">
                {info?.creator?.nickname}
              </EllipsisText>
            </Stack>
          </Stack>

          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Chip
              icon={<Share fontSize={"small"} />}
              label={
                <Typography variant="body2">{info?.shareCount}</Typography>
              }
              sx={{ px: 1.5 }}
            />
            <Chip
              icon={<Queue fontSize={"small"} />}
              label={
                <Typography variant="body2">{info?.subscribedCount}</Typography>
              }
              sx={{ px: 1.5 }}
            />
          </Stack>
        </Stack>
      </Stack>
      <EllipsisText variant="body2" color={"text.secondary"}>
        {isEmpty(info?.description) ? "创建者未添加描述" : info?.description}
      </EllipsisText>
    </Stack>
  );
};

export default PlaylistHeader;
