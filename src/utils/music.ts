import { checkSongPlay, getSongUrl } from "../services/music.service";

export const playMusic = async (id: string) => {
  const res = await checkSongPlay(id);
  if (res.success) {
    const { data } = await getSongUrl(id);
    const url = data[0].url;
    return url;
  }
  return null;
};
