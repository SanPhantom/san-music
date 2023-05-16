import { Box, Divider, Stack, Typography } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { StyledTab, StyledTabs } from "../components/common/CommonTabs";
import SearchArtists from "../components/search/SearchArtists";
import SearchPlaylist from "../components/search/SearchPlaylist";
import SearchSong from "../components/search/SearchSong";
import { SearchKey } from "../constants";

const SearchPage = () => {
  const [params] = useSearchParams();
  const searchKey = params.get("s");

  const tabsData = [
    SearchKey[1],
    SearchKey[100],
    SearchKey[1000],
    SearchKey[1004],
  ];

  const [searchType, setSearchType] = useState(0);

  return (
    <Stack id="searchPage" sx={{ height: "inherit" }}>
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
        value={searchType}
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
        {tabsData.map((item: any) => (
          <StyledTab key={SearchKey[item]} label={item} />
        ))}
      </StyledTabs>
      <Divider />
      <SwipeableViews
        disableLazyLoading
        index={searchType}
        onChangeIndex={(index) => {
          setSearchType(index);
        }}
        containerStyle={{ height: "100%" }}
        style={{ height: "100%", marginTop: 8 }}
        slideStyle={{
          height: "100%",
        }}
      >
        <SearchSong searchKey={searchKey} />
        <SearchArtists searchKey={searchKey} />
        <SearchPlaylist searchKey={searchKey} />
      </SwipeableViews>
    </Stack>
  );
};

export default SearchPage;
