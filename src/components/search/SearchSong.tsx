import { useRequest } from "ahooks";
import { isEmpty } from "ramda";
import { search } from "../../services/search.service";
import MusicSongItem from "../ListItem/MusicSongItem";
import SearchResult from "./SearchResult";
import { Stack } from "@mui/material";

interface ISearchSongProps {
  searchKey: string | null;
}

const SearchSong = ({ searchKey }: ISearchSongProps) => {
  const navigate = useNavigate();

  const { data, run, cancel, loading } = useRequest(search, { manual: true });

  const songList = data?.result.songs ?? [];
  const totalNumber = data?.result.songCount ?? 0;
  const limit = 30;

  const [offset, setOffset] = useState(1);

  useEffect(() => {
    if (isEmpty(searchKey)) navigate(-1);
    if (searchKey) {
      if (loading) {
        cancel();
      }
      run({
        type: 1,
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
        {songList.map((item: any, index: number) => (
          <MusicSongItem
            showAction
            key={item.id}
            song={item}
            index={index + 1}
            onItemClick={() => {
              // musicListAction("add", item.id);
            }}
          />
        ))}
      </Stack>
    </SearchResult>
  );
};

export default SearchSong;
