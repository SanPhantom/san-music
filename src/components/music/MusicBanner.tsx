import { Box } from "@mui/material";
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
            }}
          >
            <Image src={item.imageUrl} alt="" />
          </Box>
        )}
      />
    </Box>
  );
};

export default MusicBanner;
