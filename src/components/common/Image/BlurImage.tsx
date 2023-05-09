import { Box, alpha } from "@mui/material";
import "./image.css";

const BlurImage = (
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) => {
  return (
    <Box sx={{ width: "100%", height: "100%", position: "absolute" }}>
      <img
        loading="lazy"
        {...props}
        className={`${props.className} blur-img-root`}
      />
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
          background: (theme) => alpha(theme.palette.common.black, 0.5),
          backdropFilter: "blur(48px)",
        }}
      />
    </Box>
  );
};

export default BlurImage;
