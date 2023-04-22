import { styled, Typography, TypographyProps } from "@mui/material";

interface IEllipsisTextProps extends TypographyProps {
  line?: number;
}

const EllipsisText = styled(({ line = 1, ...props }: IEllipsisTextProps) => (
  <Typography {...props} sx={{ WebkitLineClamp: line?.toString() }} />
))(({ theme }) => ({
  width: "100%",
  textOverflow: "ellipsis",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  userSelect: "none",
}));

export default EllipsisText;
