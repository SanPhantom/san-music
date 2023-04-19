import { Box, Typography } from "@mui/material";
import { useCreation, useRequest } from "ahooks";
import { banner } from "../../services/common.service";
import Banner from "../common/Banner/Banner";
import Image from "../common/Image/Image";
import LoadingView from "../common/LoadingView";

const MusicBanner = () => {
  const { data, loading } = useRequest(banner, {
    manual: false,
    defaultParams: [{ type: 0 }],
  });

  const banners = useCreation(() => {
    return data?.banners ?? [];
  }, [data]);

  return (
    <Box
      sx={{
        width: "100%",
        height: 0,
        position: "relative",
        boxSizing: "border-box",
        overflow: "hidden",
        borderRadius: 2,
        pb: "calc(100% * (10 / 27) )",
      }}
    >
      <LoadingView loading={loading} minHeight={120}>
        <Banner
          list={banners}
          renderItem={(item, index) => (
            <Box
              key={`${item.encodeId}_${index}`}
              sx={{
                width: "100%",
                position: "relative",
                cursor: "pointer",
                fontSize: 0,
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <Image src={item.imageUrl} alt="" />
              <Box
                sx={{
                  backgroundColor: item.titleColor,
                  color: "#ffffff",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  px: 2,
                  py: 0.5,
                  borderTopLeftRadius: 8,
                }}
              >
                <Typography fontSize={14}>{item.typeTitle}</Typography>
              </Box>
            </Box>
          )}
        />
      </LoadingView>
    </Box>
  );
};

export default MusicBanner;
