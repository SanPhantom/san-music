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

export const newSongExpress = () => {
  return musicAxios.get<any, any>("/personalized/newsong", {});
};

export const getPlaylistDetail = (id: string) => {
  return musicAxios.get<any, any>("/playlist/detail", {
    params: {
      id,
    },
  });
};

export const getPlaylistSongs = (
  id: string,
  page: number,
  pageSize: number
) => {
  console.log({ id, page, pageSize });
  return musicAxios.get<any, any>("/playlist/track/all", {
    params: {
      id,
      limit: pageSize,
      offset: pageSize * page,
    },
  });
};
