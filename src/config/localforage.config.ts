import localforage from "localforage";

export const getLocalItem = async (key: string) => {
  return new Promise<string>((resolve) => {
    localforage.getItem(key).then((value) => {
      resolve(value as string);
    });
  });
};

export const setLocalItem = (key: string, value: string) => {
  localforage.setItem(key, value);
};
