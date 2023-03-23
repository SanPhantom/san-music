import { Backdrop, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "./Image/Image";
import LoadingGif from "../../assets/loading.gif";

interface ILoadingProps {}

const Loading = () => {
  return (
    <Stack
      direction={"row"}
      alignItems="center"
      justifyContent={"center"}
      sx={{ pt: 2 }}
    >
      <Image src={LoadingGif} style={{ width: 32 }} />
      <Typography variant="body2" color={"primary.main"}>
        {"数据加载中..."}
      </Typography>
    </Stack>
  );
};

export default Loading;
