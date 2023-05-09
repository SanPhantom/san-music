const getColor = (colorData: Uint8ClampedArray) => {
  const matrix: number[] = Array.from(colorData);
  let colorArr: any = [];
  let colorList: { [x: string]: any } = {};
  const pixelArray: any = [];
  let i = 0;
  while (i < matrix.length) {
    const r = matrix[i];
    const g = matrix[i + 1];
    const b = matrix[i + 2];
    const a = matrix[i + 3];
    i = i + 4; // 最后 +4 比每次 i++ 快 10ms 左右性能
    if (typeof a === "undefined" || a >= 125) {
      if (!(r > 250 && g > 250 && b > 250)) {
        pixelArray.push([r, g, b]);
      }
    }
    const key = [r, g, b, a].join(",");
    key in colorList ? ++colorList[key] : (colorList[key] = 1);
  }

  console.log({ pixelArray, colorList });
  // 发送数组到聚类值的量化函数,使用中值切割算法
  // const cmap = quantize(pixelArray, 3);
  // const palette = cmap ? cmap.palette() : null;
  // console.log("🚀 ~ file: useHandleImg.ts:69 ~ getColor ~ palette:", palette);
  // return palette;
};

export const getImageColor = async (imageData: HTMLImageElement) => {
  return new Promise(() => {
    imageData.onload = () => {
      const width = imageData.width;
      const height = imageData.height;
      const canvas = document.createElement("canvas");
      canvas.setAttribute("width", `${width}px`);
      canvas.setAttribute("height", `${height}px`);
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(imageData, 0, 0, width, height);
        const imgUrl = canvas.toDataURL("image/jpeg", 1);
        let originalPixels;
        try {
          //保存像素
          originalPixels = ctx.getImageData(0, 0, width, height).data;
          console.log({ originalPixels });
          let colors = getColor(originalPixels);
          // const themeColor = colors[0];
        } catch (error) {
          console.log(error);
        }
      }
    };
  });
};
