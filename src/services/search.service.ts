import musicAxios from "../config/axios.config";
import { SearchKey } from "../constants";

export const searchDefaultKey = () => {
  return musicAxios.get<any, any>("/search/default");
};

export const searchHot = () => {
  return musicAxios.get<any, any>("/search/hot");
};

export const searchHotDetail = () => {
  return musicAxios.get<any, any>("/search/hot/detail");
};

export const searchSuggest = (keywords: string) => {
  return musicAxios.get<any, any>("/search/suggest", {
    params: {
      keywords,
    },
  });
};

export const search = (data: {
  type?: keyof typeof SearchKey;
  keywords: string;
  offset: number;
  limit?: number;
}) => {
  return musicAxios.get<any, any>("/search", {
    params: {
      keywords: data.keywords,
      limit: data.limit ?? 10,
      offset: (data.offset - 1) * (data.limit ?? 10),
      type: data.type ?? 1,
    },
  });
};
