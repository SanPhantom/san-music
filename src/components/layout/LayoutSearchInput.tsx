import {
  ClickAwayListener,
  Divider,
  Fade,
  Paper,
  Popper,
  Stack,
  alpha,
} from "@mui/material";
import { useCreation, useMemoizedFn, useRequest } from "ahooks";
import { isEmpty } from "ramda";
import { searchDefaultKey } from "../../services/search.service";
import SearchInput from "../common/SearchInput";
import SearchHotList from "./SearchHotList";
import SearchSuggestList from "./SearchSuggestList";

const LayoutSearchInput = () => {
  /** request area */
  const { data: searchDefaultKeyData } = useRequest(searchDefaultKey, {
    manual: false,
  });
  /** request area */

  /** ref area */
  const searchInputRef = useRef<HTMLDivElement>(null);

  /** state area */
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const { open, id } = useCreation(
    () => ({
      open: Boolean(anchorEl),
      id: Boolean(anchorEl) ? "simple-popover" : undefined,
    }),
    [anchorEl]
  );

  const defaultKey = searchDefaultKeyData?.data.showKeyword;
  const [searchKey, setSearchKey] = useState("");
  /** state area */

  /** methods area */
  const handleSearch = useMemoizedFn((keyword: string) => {
    navigate(`/search?s=${encodeURIComponent(keyword)}`);
    setAnchorEl(null);
  });
  /** methods area */

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <div>
        <SearchInput
          ref={searchInputRef}
          aria-describedby={id}
          aria-haspopup="true"
          placeholder={defaultKey}
          value={searchKey}
          onClick={(e) => {
            setAnchorEl(searchInputRef.current);
          }}
          // onBlur={() => setAnchorEl(null)}
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter" && e.keyCode === 13) {
              if (isEmpty(searchKey)) {
                handleSearch(defaultKey);
              } else {
                handleSearch(searchKey);
              }
            }
          }}
        />

        <Popper
          keepMounted
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start"
          transition
          sx={{ zIndex: (theme) => theme.zIndex.tooltip + 1 }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper
                sx={{
                  mt: 0.5,
                  width:
                    searchInputRef.current?.getBoundingClientRect()?.width ?? 0,
                  background: (theme) =>
                    alpha(theme.palette.common.white, 0.95),
                  maxHeight: 420,
                  overflow: "auto",
                  p: 2,
                }}
              >
                <Stack sx={{ gap: 1 }}>
                  <SearchSuggestList
                    searchKey={searchKey}
                    onItemClick={handleSearch}
                  />
                  <Divider sx={{ mx: -2 }} />
                  <SearchHotList onItemClick={handleSearch} />
                </Stack>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default LayoutSearchInput;
