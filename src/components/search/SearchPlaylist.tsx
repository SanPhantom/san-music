import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";
import { useRequest } from "ahooks";
import { isEmpty } from "ramda";
import { search } from "../../services/search.service";
import { formatImageSize } from "../../utils";
import { formatNumber } from "../../utils/tools";
import SearchResult from "./SearchResult";
import PlaylistItem from "../ListItem/PlaylistItem";

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
    <SearchResult
      loading={loading}
      total={totalNumber}
      limit={limit}
      onChangePage={setOffset}
    >
      <Stack sx={{ width: "100%" }}>
        {playlistList.map((item: any, index: number) => (
          <PlaylistItem key={item.id} playlist={item} />
        ))}
      </Stack>
    </SearchResult>
  );
};

export default SearchPlaylist;
