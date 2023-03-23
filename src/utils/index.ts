export const formatImageSize = (url: string, size: number) => {
  return `${url}?param=${size}y${size}`;
};

export const formatArtists = (artists: any[]) => {
  return artists.map((d) => d.name).join("/");
};
