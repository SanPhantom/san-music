import musicAxios from "../config/axios.config";

export const checkSongPlay = (id: string) => {
  return musicAxios.get<any, any>("/check/music", {
    params: {
      id,
    },
  });
};

export const getSongUrl = (id: string) => {
  return musicAxios.get<any, any>("/song/url/v1", {
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

export const getSongLyric = (id: string) => {
  return musicAxios.get<any, any>("/lyric", {
    params: {
      id,
      noCookie: false,
    },
  });
};
