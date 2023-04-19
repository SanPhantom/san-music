import { CalendarToday, ChevronRight } from "@mui/icons-material";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";

interface ISingleCardProps {
  label: string;
  icon: React.ReactNode;
}

const SingleCard = ({ label, icon }: ISingleCardProps) => {
  return (
    <Paper
      component={Stack}
      direction="row"
      spacing={1}
      sx={{
        width: "100%",
        p: 2,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 8,
          height: "100%",
          bgcolor: (theme) => theme.palette.primary.main,
        }}
      />
      <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
        {icon}
        <Typography>{label}</Typography>
      </Stack>
    </Paper>
  );
};

export default SingleCard;
