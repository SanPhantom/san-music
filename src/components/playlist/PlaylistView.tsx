import { CardContent, Stack, Typography } from "@mui/material";
import React from "react";
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
    <CardContent sx={{ boxSizing: "border-box", width: "100%", py: 0 }}>
      <Stack spacing={0.5}>
        <Typography
          fontSize={14}
          color="text.secondary"
          sx={{ userSelect: "none" }}
        >
          {title}
        </Typography>
        <Stack sx={{ minHeight: 60 }}>
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
    </CardContent>
  );
};

export default PlaylistView;
