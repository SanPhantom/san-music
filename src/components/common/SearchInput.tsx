import { Search } from "@mui/icons-material";
import { InputBase, InputBaseProps, alpha, styled } from "@mui/material";

const SearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.text.primary, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.text.primary, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "24ch",
    },
  },
}));

interface SearchInputProps extends Omit<InputBaseProps, "ref"> {
  ref?: React.LegacyRef<HTMLDivElement>;
}

const SearchInput = forwardRef(
  (props: InputBaseProps, ref?: React.LegacyRef<HTMLDivElement>) => {
    return (
      <SearchWrapper ref={ref}>
        <SearchIconWrapper>
          <Search />
        </SearchIconWrapper>
        <StyledInputBase {...props} />
      </SearchWrapper>
    );
  }
);

export default SearchInput;
