import { Done } from "@mui/icons-material";
import {
  Avatar,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";
import { useRequest } from "ahooks";
import { isEmpty } from "ramda";
import { search } from "../../services/search.service";
import SearchResult from "./SearchResult";

interface ISearchArtistsProps {
  searchKey: string | null;
}

const SearchArtists = ({ searchKey }: ISearchArtistsProps) => {
  const navigate = useNavigate();

  const { data, run, cancel, loading } = useRequest(search, { manual: true });

  const artistList = data?.result.artists ?? [];
  const totalNumber = data?.result.artistCount ?? 0;
  const limit = 30;

  const [offset, setOffset] = useState(1);

  useEffect(() => {
    if (isEmpty(searchKey)) navigate(-1);
    if (searchKey) {
      if (loading) {
        cancel();
      }
      run({
        type: 100,
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
        {artistList.map((item: any, index: number) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <Chip
                disabled={item.followed}
                variant={item.followed ? "filled" : "outlined"}
                color={item.followed ? "default" : "primary"}
                sx={{ px: 1 }}
                label={item.followed ? "已关注" : "关注"}
                icon={item.followed ? undefined : <Done fontSize="small" />}
              />
            }
          >
            <ListItemAvatar>
              <Avatar src={item.img1v1Url} />
            </ListItemAvatar>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </Stack>
    </SearchResult>
  );
};

export default SearchArtists;
