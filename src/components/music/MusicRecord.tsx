import React from "react";
import { useMusicModel } from "../../models/useMusicModel";
import { Avatar, Box, Stack } from "@mui/material";
import { useCreation, useSize } from "ahooks";

interface IMusicRecordProps {}

const MusicRecord = () => {
  const { musicInfo } = useMusicModel((state) => [state.musicInfo]);
  const containerRef = useRef<HTMLDivElement>(null);

  const size = useSize(containerRef);

  const picSize = useCreation(() => {
    if (size?.height && size.width) {
      if (size.height > size.width) {
        return size.width / 2;
      }
      return size.height / 2;
    }
    return 0;
  }, [size]);

  return (
    <Stack
      ref={containerRef}
      sx={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar
        src={musicInfo?.targetPic}
        sx={{
          width: picSize,
          height: picSize,
          animation: "rotate linear 20s infinite",
        }}
      />
    </Stack>
  );
};

export default MusicRecord;
