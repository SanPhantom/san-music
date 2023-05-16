import { useRequest } from "ahooks";
import React from "react";
import { search } from "../../services/search.service";
import { isEmpty } from "ramda";
import { Done, MoreVert } from "@mui/icons-material";
import {
  Stack,
  ListItem,
  Chip,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Pagination,
  Box,
  IconButton,
} from "@mui/material";
import LoadingView from "../common/LoadingView";
import { formatImageSize } from "../../utils";
import { formatNumber } from "../../utils/tools";

interface ISearchPlaylistProps {
  searchKey: string | null;
}

const SearchPlaylist = ({ searchKey }: ISearchPlaylistProps) => {
  const navigate = useNavigate();

  const { data, run, cancel, loading } = useRequest(search, { manual: true });

  const playlistList = data?.result.playlists ?? [];
  const totalNumber = data?.result.playlistCount ?? 0;
  const limit = 20;

  const [offset, setOffset] = useState(1);

  useEffect(() => {
    if (isEmpty(searchKey)) navigate(-1);
    if (searchKey) {
      if (loading) {
        cancel();
      }
      run({
        type: 1000,
        keywords: searchKey,
        offset: offset,
        limit: limit,
      });
    }
  }, [searchKey, offset]);

  return (
    <Stack sx={{ gap: 2, alignItems: "center", height: "100%" }}>
      <Box sx={{ flex: 1, width: "100%", overflow: "auto" }}>
        <LoadingView loading={loading} minHeight={240}>
          <Stack sx={{ width: "100%" }}>
            {playlistList.map((item: any, index: number) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <Stack>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <MoreVert color="disabled" fontSize="small" />
                    </IconButton>
                  </Stack>
                }
                onClick={() => navigate(`/playlist/${item.id}`)}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    src={formatImageSize(item.coverImgUrl, 56)}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`${item.trackCount}首, By ${
                    item.creator.nickname
                  }, 播放${formatNumber(item.playCount)}次`}
                />
              </ListItem>
            ))}
          </Stack>
        </LoadingView>
      </Box>
      <Pagination
        count={Math.ceil(totalNumber / limit)}
        shape="rounded"
        // variant="outlined"
        color="primary"
        onChange={(_, page) => {
          setOffset(page);
        }}
      />
    </Stack>
  );
};

export default SearchPlaylist;
