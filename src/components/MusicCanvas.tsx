import { Box, useTheme } from "@mui/material";
import {
  useCreation,
  useMemoizedFn,
  useMount,
  useSize,
  useUnmount,
} from "ahooks";
import { usePlayerModel } from "../models/usePlayerModel";

interface IMusicCanvasProps {}

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
        let grd = canvasCtx.createLinearGradient(0, 0, 600, 0);
        grd.addColorStop(0, "#fff");
        grd.addColorStop(1, theme.palette.primary.main);
        const lineWidth = (size?.width ?? 0) / dataArray.length;
        for (let i = 0; i < dataArray.length; i++) {
          const value = dataArray[i * 2];

          canvasCtx.fillStyle = grd;
          canvasCtx.fillRect(i * 2, size?.height ?? 0, lineWidth, -value + 1);
          canvasCtx.fillRect(
            i * 2,
            (size?.height ?? 0) - 20 - value,
            lineWidth,
            0
          );
        }
      }
    }
  });

  const initAudio = useMemoizedFn(() => {
    if (analyser && audioSource && audioCtx) {
      const bufferLength = analyser.fftSize;

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
    <Box ref={containerRef} sx={{ width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        width={size?.width ?? 0}
        height={size?.height ?? 0}
      />
    </Box>
  );
};

export default MusicCanvas;
