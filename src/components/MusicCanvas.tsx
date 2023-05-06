import { Box } from "@mui/material";
import React from "react";
import { usePlayerModel } from "../models/usePlayerModel";
import { useCreation, useMemoizedFn, useSize } from "ahooks";

interface IMusicCanvasProps {}

const MusicCanvas = () => {
  const { player } = usePlayerModel((state) => [state.player]);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const size = useSize(containerRef);

  if (!player) return null;

  const handleDrawCanvas = useMemoizedFn((dataArray) => {
    // draw canvas
    const canvasCtx = canvasRef.current?.getContext("2d");
    canvasCtx?.clearRect(0, 0, size?.width ?? 0, size?.height ?? 0);
  });

  const initAudio = useMemoizedFn(() => {
    const audioCtx = new AudioContext();

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;

    const source = audioCtx.createMediaElementSource(player);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    const bufferLength = analyser.fftSize;

    const dataArray = new Uint8Array(bufferLength);

    const renderFrame = () => {
      requestAnimationFrame(renderFrame);
      console.log(dataArray);
      analyser.getByteFrequencyData(dataArray);
      handleDrawCanvas(dataArray);
    };
    renderFrame();
  });

  useCreation(() => {
    if (size?.width && size?.height) {
      initAudio();
    }
  }, [size]);

  return (
    <Box ref={containerRef} sx={{ width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} />
    </Box>
  );
};

export default MusicCanvas;
