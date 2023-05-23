import { useRequest } from "ahooks";
import { searchHotDetail } from "../../services/search.service";
import { Stack, Typography } from "@mui/material";
import EllipsisText from "../common/EllipsisText/EllipsisText";
import LoadingView from "../common/LoadingView";

interface ISearchHotListProps {}

const SearchHotItem = ({
  item,
  onItemClick,
}: {
  item: any;
  onItemClick?: (str: string) => void;
}) => {
  return (
    <Stack
      key={item.score}
      sx={{ p: 1 }}
      onClick={() => onItemClick?.(item.searchWord)}
    >
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          fontSize: 0,
          gap: 1,
        }}
      >
        {item.iconUrl && (
          <img src={item.iconUrl} alt="" style={{ height: 16 }} />
        )}
        <Typography variant="body2">{item.searchWord}</Typography>
      </Stack>
      <EllipsisText variant="caption" color={"text.secondary"}>
        {item.content}
      </EllipsisText>
    </Stack>
  );
};

const SearchHotList = memo(
  ({ onItemClick }: { onItemClick?: (str: string) => void }) => {
    const { data: searchHotData, loading: searchHotLoading } = useRequest(
      searchHotDetail,
      {
        manual: false,
      }
    );
    const searchHotList = searchHotData?.data ?? [];

    return (
      <Stack>
        <Typography variant="caption" color={"text.disabled"}>
          热搜
        </Typography>
        <LoadingView loading={searchHotLoading} minHeight={120}>
          {searchHotList.map((item: any, index: number) => (
            <SearchHotItem
              key={item.score}
              item={item}
              onItemClick={onItemClick}
            />
          ))}
        </LoadingView>
      </Stack>
    );
  }
);

export default SearchHotList;
