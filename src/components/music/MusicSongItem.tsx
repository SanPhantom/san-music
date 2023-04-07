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
import { usePlayerModel } from "../../models/usePlayerModel";
import { formatArtists, formatImageSize } from "../../utils";
import EllipsisText from "../common/EllipsisText/EllipsisText";

interface IMusicSongItemProps {
  song: any;
  index?: number;
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
      {(song.alias || song.alia).length > 0 && (
        <Typography
          component={"span"}
          variant="body2"
          color={"text.disabled"}
        >{` - ${(song.alias || song.alia)[0]}`}</Typography>
      )}
    </EllipsisText>
  );
};

const MusicSongItem = ({ song, index }: IMusicSongItemProps) => {
  const { playMusic } = usePlayerModel();
  const { avatar, artist } = useCreation(() => {
    let avatar = "";
    let artist = "";
    if (song.album && song.artists) {
      avatar = formatImageSize(song.album.picUrl, 40);
      artist = formatArtists(song.artists);
    } else {
      avatar = formatImageSize(song.al.picUrl, 40);
      artist = formatArtists(song.ar);
    }

    return { avatar, artist };
  }, [song]);

  return (
    <ListItem
      onClick={() => {
        playMusic(song.id);
      }}
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
