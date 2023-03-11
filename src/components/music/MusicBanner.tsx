import { Box, Typography } from "@mui/material";
import { useCreation, useMemoizedFn, useMount, useSetState } from "ahooks";
import React from "react";
import { banner } from "../../services/common.service";
import Banner from "../common/Banner/Banner";
import Image from "../common/Image/Image";

interface IMusicBannerProps {}

const MusicBanner = () => {
  const [state, setState] = useSetState({
    banners: [] as any[],
  });

  const getBanners = useMemoizedFn(async () => {
    const bannerRes = await banner({ type: 0 });
    return bannerRes.banners;
  });

  useMount(async () => {
    setState({
      banners: await getBanners(),
    });
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: 0,
        position: "relative",
        boxSizing: "border-box",
        overflow: "hidden",
        pb: "calc(100% * (10 / 27) )",
      }}
    >
      <Banner
        list={state.banners}
        renderItem={(item, index) => (
          <Box
            key={`${item.encodeId}_${index}`}
            sx={{
              width: "100%",
              position: "relative",
              cursor: "pointer",
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
    </Box>
  );
};

export default MusicBanner;
