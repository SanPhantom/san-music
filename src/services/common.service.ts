import musicAxios from "../config/axios.config";

export const banner = (data: { type: number }) => {
  return musicAxios.get<any, any>("/banner", {
    params: { ...data },
  });
};
