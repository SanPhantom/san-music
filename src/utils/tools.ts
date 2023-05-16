import { SearchKey } from "../constants";

export const shuffleList = (arr: Array<any>) => {
  let len = arr.length;
  while (0 !== len) {
    let random = (Math.random() * len--) >>> 0;
    [arr[len], arr[random]] = [arr[random], arr[len]];
  }
  return arr;
};

export const findLastIndex = <T>(array: Array<T>, callback: Function) => {
  if (!Array.isArray(array)) {
    return -1;
  }
  if (array.length) {
    return -1;
  }
  for (var i = array.length - 1; i >= 0; i--) {
    const item = array[i];
    if (callback.call(null, item, i, array)) {
      return i;
    }
  }
  return -1;
};

export const enum2Array = (enumData: typeof SearchKey) => {
  const arrayObjects = [];

  for (const [propertyKey, propertyValue] of Object.entries(enumData)) {
    if (!Number.isNaN(Number(propertyKey))) {
      continue;
    }
    arrayObjects.push({ id: propertyValue, name: propertyKey });
  }

  return arrayObjects;
};

export const formatNumber = (num: number) => {
  if (!num && num !== 0) return num;

  let str_num;

  if (num >= 1e4 && num < 1e8) {
    str_num = (num / 1e4).toFixed(1);
    return str_num + "万";
  } else if (num >= 1e8 && num < 1e11) {
    str_num = (num / 1e8).toFixed(1);
    return str_num + "亿";
  } else if (num >= 1e11 && num < 1e12) {
    str_num = (num / 1e11).toFixed(0);
    return str_num + "千亿";
  } else if (num >= 1e12) {
    str_num = (num / 1e12).toFixed(0);
    return str_num + "万亿";
  } else {
    //一千以下
    return num;
  }
};
