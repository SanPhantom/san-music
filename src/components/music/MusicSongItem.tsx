import {
  ListItem,
  alpha,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useCreation } from "ahooks";
import React from "react";
import { formatArtists, formatImageSize } from "../../utils";
import EllipsisText from "../common/EllipsisText/EllipsisText";

interface IMusicSongItemProps {
  song: any;
}

const MusicItemPrimary = ({ song }: IMusicSongItemProps) => {
  return (
    <EllipsisText variant="body2">
      <Typography
        component={"span"}
        variant="body2"
        color={false ? "primary.main" : ""}
      >
        {song.name}
      </Typography>
      {song.alias.length > 0 && (
        <Typography
          component={"span"}
          variant="body2"
          color={"text.disabled"}
        >{` - ${song.alias[0]}`}</Typography>
      )}
    </EllipsisText>
  );
};

const MusicSongItem = ({ song }: IMusicSongItemProps) => {
  const { avatar, artist } = useCreation(() => {
    const avatar = formatImageSize(song.album.picUrl, 40);
    const artist = formatArtists(song.artists);
    return { avatar, artist };
  }, [song]);

  return (
    <ListItem
      sx={{
        px: 1,
        py: 1,
        cursor: "pointer",
        borderRadius: 1,
        transition: (theme) =>
          theme.transitions.create(["background-color"], {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeInOut,
          }),
        ["&:hover"]: {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.25),
        },
      }}
    >
      {avatar && (
        <ListItemAvatar sx={{ minWidth: 50 }}>
          <Avatar
            src={`${avatar}`}
            variant="rounded"
            sx={{
              width: 40,
              height: 40,
              boxShadow: (theme) => theme.shadows[1],
            }}
          />
        </ListItemAvatar>
      )}
      <ListItemText
        sx={{ my: 0 }}
        primary={<MusicItemPrimary song={song} />}
        secondary={
          <Typography variant="caption" color="text.secondary">
            {artist}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default MusicSongItem;
