import { styled, Typography, TypographyProps } from "@mui/material";
import React from "react";

interface IEllipsisTextProps extends TypographyProps {
  line?: number;
}

const EllipsisText = styled(({ line = 1, ...props }: IEllipsisTextProps) => (
  <Typography {...props} sx={{ "-webkit-line-clamp": line?.toString() }} />
))(({ theme }) => ({
  width: "100%",
  textOverflow: "ellipsis",
  overflow: "hidden",
  display: "-webkit-box",
  "-webkit-box-orient": "vertical",
  userSelect: "none",
}));

export default EllipsisText;
