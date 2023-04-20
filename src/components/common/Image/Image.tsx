import React from "react";
import "./image.less";

const Image = (
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) => {
  return (
    <img loading="lazy" {...props} className={`${props.className} img-root`} />
  );
};

export default Image;
