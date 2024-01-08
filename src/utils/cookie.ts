// const music_u = readCookieKey(cookie, "MUSIC_U");
// const music_a = readCookieKey(cookie, "MUSIC_A");

import { isEmpty, isNil } from "ramda";

// `MUSIC_A=${readCookieKey(cookie, "MUSIC_A")}; __csrf=${readCookieKey(
//   cookie,
//   "__csrf"
// )}`

export const readCookieKey = (cookie: string, key: string) => {
  if (isEmpty(cookie) || isNil(cookie)) return "";
  const cookieArr = cookie.split(";");
  const cookieMap = cookieArr
    .map((item) => {
      const keyValue = item.split("=");
      if (keyValue[0] === "" || keyValue[1] === undefined) {
        return undefined;
      }
      return {
        [keyValue[0].trim()]: keyValue[1],
      };
    })
    .reduce((acc, value) => {
      return { ...acc, ...value };
    });
  return cookieMap?.[key];
};
