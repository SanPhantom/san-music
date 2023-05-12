import { Stack, Typography } from "@mui/material";
import { isEmpty } from "ramda";

const SearchPage = () => {
  const [params] = useSearchParams();
  const searchKey = params.get("s");

  const navigate = useNavigate();

  if (isEmpty(searchKey)) navigate(-1);

  return (
    <Stack>
      <Typography variant="h6">{`当前搜索词: ${searchKey}`}</Typography>
    </Stack>
  );
};

export default SearchPage;
