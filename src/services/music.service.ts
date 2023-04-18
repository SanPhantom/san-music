import musicAxios from "../config/axios.config";

export const checkSongPlay = (id: string) => {
  return musicAxios.get<any, any>("/check/music", {
    params: {
      id,
    },
  });
};

export const getSongUrl = (id: string) => {
  return musicAxios.get<any, any>("/song/url", {
    params: {
      id,
      level: "lossless",
    },
  });
};

export const getSongDetail = (ids: string) => {
  return musicAxios.get<any, any>("/song/detail", {
    params: {
      ids,
    },
  });
};
