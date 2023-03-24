import {
  Box,
  Container,
  LinearProgress,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

interface IMusicMiniPlayerProps {}

const MusicMiniPlayer = () => {
  return (
    <Toolbar
      className="abs-box "
      sx={{
        width: "100%",
        backgroundColor: (theme) => theme.palette.common.white,
        position: "relative",
      }}
    >
      <LinearProgress
        variant="determinate"
        value={40}
        sx={{
          width: "100%",
          height: 2,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <Container sx={{ height: "100%" }}>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Typography>123</Typography>
          <Typography>456</Typography>
        </Stack>
      </Container>
    </Toolbar>
  );
};

export default MusicMiniPlayer;
