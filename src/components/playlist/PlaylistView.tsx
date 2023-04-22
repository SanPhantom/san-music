import { Stack, Typography } from "@mui/material";
import CommonListItem from "../common/CommonListItem";

interface IPlaylistViewProps {
  title: string;
  extra?: React.ReactNode;
  playlist?: any[];
  itemClick?: (item: any) => void;
}

const PlaylistView = ({
  title,
  extra,
  playlist = [] as any[],
  itemClick,
}: IPlaylistViewProps) => {
  return (
    <Stack sx={{ boxSizing: "border-box", width: "100%", px: 1 }}>
      <Stack spacing={0.5}>
        <Stack>
          <Stack direction={"row"} alignItems="center" sx={{ pl: 1 }}>
            <Typography
              fontSize={14}
              fontWeight={600}
              color="text.primary"
              sx={{ userSelect: "none" }}
            >
              {title}
            </Typography>
          </Stack>
        </Stack>

        <Stack sx={{ minHeight: 60 }} spacing={1}>
          {playlist.map((item: any) => (
            <CommonListItem
              key={item?.id}
              primary={item?.name}
              secondary={`共${item?.trackCount}首`}
              avatar={item?.coverImgUrl}
              onClick={() => itemClick?.(item)}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PlaylistView;
