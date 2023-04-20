import { Stack, Typography } from "@mui/material";
import LoadingIcon from "../icons/LoadingIcon";

interface ILoadingProps {}

const Loading = () => {
  return (
    <Stack
      direction={"row"}
      alignItems="center"
      justifyContent={"center"}
      sx={{ pt: 2, gap: 2 }}
    >
      <LoadingIcon color="primary" />
      <Typography variant="body2" color={"primary.main"}>
        {"数据加载中..."}
      </Typography>
    </Stack>
  );
};

export default Loading;
