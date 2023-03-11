import musicAxios from "../config/axios.config";

export const getUserPlaylist = (data: any) => {
  return musicAxios.get<any, any>("/user/playlist", {
    params: { ...data, limit: 1000 },
  });
};

export const getRecommendPlaylist = () => {
  return musicAxios.get<any, any>("/recommend/resource");
};

export const getRecommendSongs = () => {
  return musicAxios.get<any, any>("/recommend/songs");
};
