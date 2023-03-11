import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import EllipsisText from "./EllipsisText/EllipsisText";

interface ICommonListItemProps {
  primary?: string;
  secondary?: string;
  avatar?: string;
  selected?: boolean;
  onClick?: () => void;
}

const CommonListItem = ({
  selected = false,
  primary,
  secondary,
  avatar,
  ...props
}: ICommonListItemProps) => {
  return (
    <ListItem sx={{ px: 0, cursor: "pointer" }}>
      {avatar && (
        <ListItemAvatar>
          <Avatar src={avatar} variant="rounded" />
        </ListItemAvatar>
      )}
      <ListItemText
        primary={
          <EllipsisText fontSize={14} color={selected ? "primary.main" : ""}>
            {primary}
          </EllipsisText>
        }
        secondary={
          <Typography fontSize={12} color="text.secondary">
            {secondary}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default CommonListItem;
