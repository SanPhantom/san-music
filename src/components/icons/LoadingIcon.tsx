import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";
import { ReactComponent as Loading } from "../../assets/loading.svg";

const LoadingIcon = (
  props: Omit<SvgIconProps, "component" | "inheritViewBox">
) => {
  return <SvgIcon inheritViewBox component={Loading} {...props} />;
};

export default LoadingIcon;
