import { Stack, Typography } from "@mui/material";
import LoadingView from "../common/LoadingView";
import { useDebounceEffect, useRequest } from "ahooks";
import { searchSuggest } from "../../services/search.service";

interface ISearchSuggestListProps {
  searchKey: string;
  onItemClick?: (str: string) => void;
}

const SearchSuggestList = ({
  searchKey,
  onItemClick,
}: ISearchSuggestListProps) => {
  const {
    data: searchSuggestData,
    run: runSearchSuggest,
    loading: searchSuggestLoading,
    cancel: cancelSearchSuggest,
  } = useRequest(searchSuggest, {
    manual: true,
  });

  const searchSuggestList = searchSuggestData?.result?.allMatch ?? [];

  useDebounceEffect(
    () => {
      if (searchSuggestLoading) {
        cancelSearchSuggest();
      }
      if (searchKey !== "") {
        runSearchSuggest(searchKey);
      }
    },
    [searchKey],
    {
      wait: 1000,
    }
  );

  return (
    <Stack>
      <Typography variant="caption" color={"text.disabled"}>
        搜索建议
      </Typography>
      <LoadingView loading={searchSuggestLoading} minHeight={120}>
        {searchSuggestList.length === 0 && (
          <Stack
            sx={{
              height: 120,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" color={"text.secondary"}>
              暂无记录
            </Typography>
          </Stack>
        )}
        {searchSuggestList.map((item: any) => (
          <Typography
            key={item.keyword}
            onClick={() => onItemClick?.(item.keyword)}
            component={Stack}
            variant="body2"
            sx={{ p: 1, width: "100%" }}
          >
            {item.keyword}
          </Typography>
        ))}
      </LoadingView>
    </Stack>
  );
};

export default SearchSuggestList;
