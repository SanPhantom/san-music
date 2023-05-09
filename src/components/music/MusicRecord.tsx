import { useMusicModel } from "../../models/useMusicModel";
import { Avatar, Box, Stack } from "@mui/material";
import { useCreation, useSize } from "ahooks";
import { formatImageSize } from "../../utils";

interface IMusicRecordProps {}

const MusicRecord = () => {
  const { musicInfo } = useMusicModel((state) => [state.musicInfo]);
  const containerRef = useRef<HTMLDivElement>(null);

  const size = useSize(containerRef);

  const picSize = useCreation(() => {
    const rate = 0.6;
    if (size?.height && size.width) {
      if (size.height > size.width) {
        return size.width * rate;
      }
      return size.height * rate;
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
        src={formatImageSize(musicInfo?.targetPic ?? "", 512)}
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
