import { Stack } from "@mui/material";
import Loading from "./Loading";

interface ILoadingViewProps {
  loading?: boolean;
  minHeight?: number | string;
  children: React.ReactNode;
}

const LoadingView = ({ loading, minHeight, children }: ILoadingViewProps) => {
  return (
    <Stack sx={{ minHeight: minHeight ?? 120 }}>
      {loading ? <Loading /> : children}
    </Stack>
  );
};

export default LoadingView;
