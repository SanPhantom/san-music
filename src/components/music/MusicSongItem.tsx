import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useCreation } from "ahooks";
import { isEmpty } from "ramda";
import LoadingGif from "../../assets/loading.gif";
import { useMusicModel } from "../../models/useMusicModel";
import { usePlayerModel } from "../../models/usePlayerModel";
import { formatArtists, formatImageSize } from "../../utils";
import EllipsisText from "../common/EllipsisText/EllipsisText";
import Image from "../common/Image/Image";

interface IMusicSongItemProps {
  song: any;
  index?: number;
  showAction?: boolean;
  onItemClick?: (song: any) => void;
}

const MusicItemPrimary = ({ song }: IMusicSongItemProps) => {
  return (
    <EllipsisText variant="body2">
      <Typography
        component={"span"}
        variant="body1"
        color={false ? "primary.main" : ""}
        fontWeight={600}
      >
        {song.name}
      </Typography>
      {(song.alias || song.alia).length > 0 && (
        <Typography
          component={"span"}
          variant="body1"
          color={"text.secondary"}
        >{` - ${(song.alias || song.alia)[0]}`}</Typography>
      )}
    </EllipsisText>
  );
};

const MusicSongItem = ({
  song,
  index,
  showAction = false,
  onItemClick,
}: IMusicSongItemProps) => {
  const { playMusic } = usePlayerModel();
  const { currentSongId } = useMusicModel();
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

  const { isVip, isCover, isCopyright } = useCreation(() => {
    return {
      isVip: song.fee === 1,
      isCover: song.originCoverType === 2,
      isCopyright: isEmpty(song.noCopyrightRcmd),
    };
  }, [song]);

  return (
    <ListItem
      className="song-item"
      onClick={() => {
        playMusic(song.id);
        onItemClick?.(song);
      }}
      sx={{
        px: 0.5,
        py: 1,
        cursor: "pointer",
        borderRadius: 2,
        "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
        ["&:active"]: {
          backgroundColor: "transparent",
        },
      }}
      {...(showAction && {
        secondaryAction: (
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
        ),
      })}
    >
      <ListItemButton sx={{ borderRadius: 2, px: 0 }}>
        {avatar && (
          <ListItemAvatar sx={{ minWidth: 50 }}>
            {index ? (
              <Typography
                component={Stack}
                variant="body2"
                justifyContent={"center"}
                alignItems="center"
              >
                {song.id === currentSongId ? (
                  <Image src={LoadingGif} style={{ width: 20 }} />
                ) : (
                  index
                )}
              </Typography>
            ) : (
              <Avatar
                src={`${avatar}`}
                variant="rounded"
                sx={{
                  width: 40,
                  height: 40,
                  boxShadow: (theme) => theme.shadows[1],
                }}
              />
            )}
          </ListItemAvatar>
        )}
        <ListItemText
          sx={{ my: 0 }}
          primary={<MusicItemPrimary song={song} />}
          secondary={
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              spacing={0.5}
            >
              {isVip && (
                <Typography
                  variant="caption"
                  sx={{
                    border: 1,
                    lineHeight: 1,
                    px: 0.25,
                    color: "primary.main",
                    borderRadius: 0.5,
                  }}
                >
                  VIP
                </Typography>
              )}
              {isCover && (
                <Typography
                  variant="caption"
                  sx={{
                    border: 1,
                    lineHeight: 1,
                    px: 0.25,
                    py: 0.21,
                    color: "primary.main",
                    borderRadius: 0.5,
                  }}
                >
                  翻唱
                </Typography>
              )}
              {isCopyright && (
                <Typography
                  variant="caption"
                  sx={{
                    border: 1,
                    lineHeight: 1,
                    px: 0.25,
                    py: 0.21,
                    color: "text.disabled",
                    borderRadius: 0.5,
                  }}
                >
                  暂无版权
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                {artist}
                {isCover &&
                  `(原唱：${formatArtists(
                    song.originSongSimpleData?.artists
                  )})`}
              </Typography>
            </Stack>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default MusicSongItem;
