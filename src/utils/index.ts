import curNumeral from "numeral";

export const formatImageSize = (url: string, size: number) => {
  return `${url}?param=${size}y${size}`;
};

export const formatArtists = (artists: any[]) => {
  return artists.map((d) => d.name).join("/");
};

export const transNumber = (num: number) => {
  var numStr = (num || 0).toString();
  return numStr.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
};

curNumeral.register("locale", "cn", {
  delimiters: {
    thousands: ",",
    decimal: ".",
  },
  abbreviations: {
    thousand: "千",
    million: "百万",
    billion: "十亿",
    trillion: "兆",
  },
  ordinal: function (number) {
    return number === 1 ? "er" : "ème";
  },
  currency: {
    symbol: "￥",
  },
});
curNumeral.locale("cn");

export const numeral = curNumeral;
