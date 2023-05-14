import { Box, Stack, Typography } from "@mui/material";
import { StyledTab, StyledTabs } from "../components/common/CommonTabs";
import { SearchKey } from "../constants";
import { enum2Array } from "../utils/tools";
import SearchSong from "../components/search/SearchSong";
import SearchArticle from "../components/search/SearchArticle";

const SearchPage = () => {
  const [params] = useSearchParams();
  const searchKey = params.get("s");

  const tabsData = enum2Array(SearchKey);

  const [searchType, setSearchType] = useState(tabsData[0].id);

  return (
    <Stack>
      <Box sx={{ mb: 2 }}>
        <Typography
          component={"span"}
          variant="subtitle1"
        >{`当前搜索词: `}</Typography>
        <Typography
          component={"span"}
          variant="subtitle1"
          fontWeight={600}
          color={"primary.main"}
        >
          {searchKey}
        </Typography>
      </Box>
      <StyledTabs
        value={searchType as number}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          position: "sticky",
          top: -16,
          zIndex: (theme) => theme.zIndex.appBar,
          width: "100%",
          background: "white",
        }}
        onChange={(_, newValue) => setSearchType(newValue)}
      >
        {[SearchKey[1], SearchKey[100], SearchKey[1000], SearchKey[1004]].map(
          (item: any) => (
            <StyledTab
              key={SearchKey[item]}
              label={item}
              value={SearchKey[item]}
            />
          )
        )}
      </StyledTabs>
      {}
      <SearchSong searchKey={searchKey} />
      <SearchArticle searchKey={searchKey} />
    </Stack>
  );
};

export default SearchPage;
