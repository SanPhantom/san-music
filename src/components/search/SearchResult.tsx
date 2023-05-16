import { Box, Pagination, Stack } from "@mui/material";
import LoadingView from "../common/LoadingView";

interface ISearchResultProps {
  total: number;
  limit: number;
  loading: boolean;
  children: React.ReactNode;
  onChangePage?: (page: number) => void;
}

const SearchResult = ({
  total,
  limit,
  loading,
  children,
  onChangePage,
}: ISearchResultProps) => {
  return (
    <Stack sx={{ gap: 2, alignItems: "center", height: "100%" }}>
      <Box sx={{ flex: 1, width: "100%", overflow: "auto" }}>
        <LoadingView loading={loading} minHeight={240}>
          {children}
        </LoadingView>
      </Box>

      {Math.ceil(total / limit) > 1 && (
        <Pagination
          count={Math.ceil(total / limit)}
          shape="rounded"
          // variant="outlined"
          color="primary"
          onChange={(_, page) => {
            onChangePage?.(page);
          }}
        />
      )}
    </Stack>
  );
};

export default SearchResult;
