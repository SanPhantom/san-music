import {
  alpha,
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
    <ListItem
      sx={{
        px: 1,
        py: 1,
        cursor: "pointer",
        borderRadius: 1,
        ["&:hover"]: {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.25),
        },
      }}
    >
      {avatar && (
        <ListItemAvatar sx={{ minWidth: 50 }}>
          <Avatar
            src={avatar}
            variant="rounded"
            sx={{
              width: 42,
              height: 42,
              boxShadow: (theme) => theme.shadows[1],
            }}
          />
        </ListItemAvatar>
      )}
      <ListItemText
        primary={
          <EllipsisText variant="body2" color={selected ? "primary.main" : ""}>
            {primary}
          </EllipsisText>
        }
        secondary={
          <Typography variant="caption" color="text.secondary">
            {secondary}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default CommonListItem;
