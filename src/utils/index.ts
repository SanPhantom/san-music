export const formatImageSize = (url: string, size: number) => {
  return `${url}?param=${size}y${size}`;
};

export const formatArtists = (artists?: any[]) => {
  return (artists ?? []).map((d) => d.name).join("/");
};

export const transNumber = (num: number) => {
  var numStr = (num || 0).toString();
  return numStr.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
};

export const transTime = (time: number = 0) => {
  let min = Math.floor(time / 1000 / 60) ?? 0;
  let sec = Math.ceil((time / 1000) % 60) ?? 0;

  if (sec >= 60) {
    min++;
    sec = 0;
  }

  const format = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };

  return `${format(min)}:${format(sec)}`;
};
