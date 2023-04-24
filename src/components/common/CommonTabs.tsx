import { styled, Tabs, Tab, TabsProps, TabProps, Theme } from "@mui/material";

interface StyledTabsProps extends Omit<TabsProps, "value" | "onChange"> {
  children?: React.ReactNode;
  value?: number;
  onChange?: (event: React.SyntheticEvent, newValue: number) => void;
}

export const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))(({ theme }) => ({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: theme.palette.primary.main,
  },
}));

interface StyledTabProps extends Omit<TabProps, "label"> {
  label: string;
}

export const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  // color: "rgba(255, 255, 255, 0.7)",
  // "&.Mui-selected": {
  //   color: "#fff",
  // },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));
