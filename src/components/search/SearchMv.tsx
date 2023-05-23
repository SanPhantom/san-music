import { Stack, Typography } from "@mui/material";
import { useRequest } from "ahooks";
import { isEmpty } from "ramda";
import { search } from "../../services/search.service";
import EllipsisText from "../common/EllipsisText/EllipsisText";
import ProportionImage from "../common/Image/ProportionImage";
import SearchResult from "./SearchResult";

interface ISearchMvProps {
  searchKey: string | null;
}

const SearchMv = ({ searchKey }: ISearchMvProps) => {
  const navigate = useNavigate();

  const { data, run, cancel, loading } = useRequest(search, { manual: true });

  const mvList = data?.result.mvs ?? [];
  const totalNumber = data?.result.mvCount ?? 0;
  const limit = 12;

  const [offset, setOffset] = useState(1);

  useEffect(() => {
    if (isEmpty(searchKey)) navigate(-1);
    if (searchKey) {
      if (loading) {
        cancel();
      }
      run({
        type: 1004,
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
      <Stack
        sx={{
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
          rowGap: 2,
          columnGap: 1.5,
        }}
      >
        {mvList.map((item: any, index: number) => (
          <Stack sx={{ width: "calc(25% - 9px)", gap: 1 }}>
            <ProportionImage
              src={item.cover}
              proportion={9 / 16}
              radio={0.5}
              sx={{ boxShadow: (theme) => theme.shadows[1] }}
            />
            <Stack sx={{ gap: 0.25 }}>
              <EllipsisText sx={{ fontWeight: 600 }}>{item.name}</EllipsisText>
              <Typography variant={"body2"} color={"text.secondary"}>
                {item.artistName}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </SearchResult>
  );
};

export default SearchMv;
