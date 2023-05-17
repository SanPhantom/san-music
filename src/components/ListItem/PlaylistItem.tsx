import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  alpha,
} from "@mui/material";
import React from "react";
import { formatImageSize } from "../../utils";
import { formatNumber } from "../../utils/tools";
import EllipsisText from "../common/EllipsisText/EllipsisText";

interface IPlaylistItemProps {
  type?: "card" | "list";
  playlist: any;
}

const PlaylistItem = ({ type = "list", playlist }: IPlaylistItemProps) => {
  const navigate = useNavigate();
  if (type === "list") {
    return (
      <ListItem
        secondaryAction={
          <Stack>
            <IconButton
              size="small"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <MoreVert color="disabled" fontSize="small" />
            </IconButton>
          </Stack>
        }
        onClick={() => navigate(`/playlist/${playlist.id}`)}
      >
        <ListItemAvatar>
          <Avatar
            variant="rounded"
            src={formatImageSize(playlist.coverImgUrl, 56)}
          />
        </ListItemAvatar>
        <ListItemText
          primary={playlist.name}
          secondary={`${playlist.trackCount}首, By ${
            playlist.creator.nickname
          }, 播放${formatNumber(playlist.playCount)}次`}
        />
      </ListItem>
    );
  }
  return (
    <Stack
      spacing={1}
      sx={{ width: 180, cursor: "pointer" }}
      onClick={() => navigate(`/playlist/${playlist.id}`)}
    >
      <Box sx={{ position: "relative" }}>
        {playlist.copywriter && (
          <Chip
            size="small"
            color="primary"
            label={playlist.copywriter}
            sx={{
              position: "absolute",
              left: 8,
              top: 8,
              zIndex: (theme) => theme.zIndex.appBar + 1,
              background: (theme) => alpha(theme.palette.primary.main, 0.8),
            }}
          />
        )}
        <Avatar
          src={formatImageSize(playlist.picUrl, 220)}
          variant="rounded"
          sx={{
            width: 180,
            height: 180,
            boxShadow: (theme) => theme.shadows[1],
          }}
        ></Avatar>
      </Box>

      <EllipsisText line={2} variant={"body1"}>
        {playlist.name}
      </EllipsisText>
    </Stack>
  );
};

export default PlaylistItem;
