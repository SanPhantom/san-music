import { Box, SxProps, Theme } from "@mui/material";
import Image from "./Image";

interface IProportionImageProps {
  src: string;
  proportion: number;
  radio?: number;
  sx?: SxProps<Theme>;
}

const ProportionImage = ({
  src,
  proportion,
  radio = 0,
  sx,
}: IProportionImageProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        paddingTop: `calc(${proportion} * 100%)`,
        position: "relative",
        borderRadius: radio,
        ...sx,
      }}
    >
      <Image
        src={src}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          borderRadius: radio * 8,
        }}
      />
    </Box>
  );
};

export default ProportionImage;
