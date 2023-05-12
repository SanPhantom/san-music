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
