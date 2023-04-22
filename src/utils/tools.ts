export const shuffleList = (arr: Array<any>) => {
  let len = arr.length;
  while (0 !== len) {
    let random = (Math.random() * len--) >>> 0;
    [arr[len], arr[random]] = [arr[random], arr[len]];
  }
  return arr;
};
