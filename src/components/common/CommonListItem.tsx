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
            src={`${avatar}?param=40y40`}
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
