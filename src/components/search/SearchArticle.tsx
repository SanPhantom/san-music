import { useRequest } from "ahooks";
import { isEmpty } from "ramda";
import { search } from "../../services/search.service";

interface ISearchArticleProps {
  searchKey: string | null;
}

const SearchArticle = ({ searchKey }: ISearchArticleProps) => {
  const navigate = useNavigate();

  const { data, run, cancel, loading } = useRequest(search, { manual: true });

  // const songList = data?.result.songs ?? [];
  // const totalNumber = data?.result.songCount ?? 0;
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
  return <div>Component</div>;
};

export default SearchArticle;
