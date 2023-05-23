import { Email } from "@mui/icons-material";
import { Toolbar, Typography, IconButton } from "@mui/material";
import LayoutSearchInput from "../components/layout/LayoutSearchInput";

interface ILayoutHeadProps {}

const LayoutHead = () => {
  return (
    <Toolbar sx={{ gap: 1.5 }}>
      <Typography
        variant="h6"
        noWrap
        component="div"
        fontWeight={600}
        fontSize={24}
        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
      >
        San Music
      </Typography>
      <LayoutSearchInput />
      <IconButton color="inherit">
        <Email color="inherit" />
      </IconButton>
    </Toolbar>
  );
};

export default LayoutHead;
