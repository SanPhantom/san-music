import { Pagination, Stack } from "@mui/material";
import { useRequest } from "ahooks";
import { isEmpty } from "ramda";
import { search } from "../../services/search.service";
import LoadingView from "../common/LoadingView";
import MusicSongItem from "../music/MusicSongItem";

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
    <Stack sx={{ gap: 1, alignItems: "center" }}>
      <LoadingView loading={loading} minHeight={240}>
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
      </LoadingView>
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

export default SearchSong;
