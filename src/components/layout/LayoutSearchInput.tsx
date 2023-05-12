import { useCreation, useMemoizedFn, useMount, useRequest } from "ahooks";
import SearchInput from "../common/SearchInput";
import {
  searchDefaultKey,
  searchHot,
  searchHotDetail,
} from "../../services/search.service";
import { isEmpty } from "ramda";
import {
  Fade,
  Paper,
  Popover,
  Popper,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import EllipsisText from "../common/EllipsisText/EllipsisText";

const LayoutSearchInput = () => {
  /** request area */
  const { data: searchDefaultKeyData } = useRequest(searchDefaultKey, {
    manual: false,
  });
  const { data: searchHotData } = useRequest(searchHotDetail, {
    manual: false,
  });
  /** request area */

  /** ref area */
  const searchInputRef = useRef<HTMLDivElement>(null);

  /** state area */
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const { open, id } = useCreation(
    () => ({
      open: Boolean(anchorEl),
      id: Boolean(anchorEl) ? "simple-popover" : undefined,
    }),
    [anchorEl]
  );

  const searchHot = searchHotData?.data ?? [];
  const defaultKey = searchDefaultKeyData?.data.showKeyword;
  const [searchKey, setSearchKey] = useState("");
  /** state area */

  /** methods area */
  const handleSearch = useMemoizedFn((keyword: string) => {});
  /** methods area */

  return (
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
        onBlur={() => setAnchorEl(null)}
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
            console.log("Search");
          }
        }}
      />

      <Popper
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
                width: anchorEl?.getBoundingClientRect()?.width ?? 0,
                background: (theme) => alpha(theme.palette.common.white, 0.75),
                maxHeight: 420,
                overflow: "auto",
                p: 1,
              }}
            >
              {searchHot.map((item: any, index: number) => (
                <Stack
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    fontSize: 0,
                    gap: 1,
                  }}
                >
                  <Typography>{index + 1}.</Typography>
                  <Stack key={item.score} sx={{ p: 1 }}>
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        fontSize: 0,
                        gap: 1,
                      }}
                    >
                      {item.iconUrl && (
                        <img src={item.iconUrl} alt="" style={{ height: 16 }} />
                      )}
                      <Typography variant="body2">{item.searchWord}</Typography>
                    </Stack>
                    <EllipsisText variant="caption" color={"text.secondary"}>
                      {item.content}
                    </EllipsisText>
                  </Stack>
                </Stack>
              ))}
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default LayoutSearchInput;
