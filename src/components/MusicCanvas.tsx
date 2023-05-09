import { Box, useTheme } from "@mui/material";
import { useMemoizedFn, useSize } from "ahooks";
import { usePlayerModel } from "../models/usePlayerModel";

// const lineWidth = 4;

const MusicCanvas = () => {
  const theme = useTheme();
  const { audioCtx, audioSource, analyser } = usePlayerModel((state) => [
    state.player,
    state.audioCtx,
    state.audioSource,
    state.analyser,
  ]);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const size = useSize(containerRef);

  const handleDrawCanvas = useMemoizedFn((dataArray) => {
    // draw canvas
    if (canvasRef.current) {
      const canvasCtx = canvasRef.current.getContext("2d");
      if (canvasCtx) {
        canvasCtx.clearRect(0, 0, size?.width ?? 0, size?.height ?? 0);
        canvasCtx?.beginPath();
        let grd = canvasCtx.createLinearGradient(
          0,
          (size?.height ?? 0) / 2,
          0,
          (size?.height ?? 0) * 2
        );
        grd.addColorStop(0, theme.palette.primary.main);
        grd.addColorStop(1, "#fff");

        const lineWidth = Math.ceil((size?.width ?? 0) / dataArray.length);

        for (let i = 0; i < dataArray.length; i++) {
          const value = dataArray[i];

          const height = (value * (size?.height ?? 0) * 2) / 255 + 1;

          canvasCtx.fillStyle = grd;
          canvasCtx.fillRect(
            i * lineWidth,
            ((size?.height ?? 0) - height) / 2,
            lineWidth,
            height + 1
          );
        }
      }
    }
  });

  const initAudio = useMemoizedFn(() => {
    if (analyser && audioSource && audioCtx) {
      analyser.maxDecibels = 70;
      const bufferLength = analyser.frequencyBinCount;

      const dataArray = new Uint8Array(bufferLength);

      const renderFrame = () => {
        requestAnimationFrame(renderFrame);
        // console.log(dataArray);
        analyser.getByteFrequencyData(dataArray);
        handleDrawCanvas(dataArray);
      };
      renderFrame();
    }
  });

  useEffect(() => {
    if (size?.width && size?.height && analyser && audioSource) {
      initAudio();
    }
  }, [size, analyser, audioSource]);

  return (
    <Box
      ref={containerRef}
      sx={{ width: "100%", height: "100%", position: "relative" }}
    >
      <canvas
        ref={canvasRef}
        width={size?.width ?? 0}
        height={size?.height ?? 0}
      />
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
};

export default MusicCanvas;
