export const replaceStringChunk = (str: string, chunkToRemove: string) =>
  str.replace(chunkToRemove, "");

export function createSelectionOptions<T>(list: Array<T>, propValue: string) {
  return list.map((obj) => {
    return {
      key: obj[propValue],
      value: obj[propValue],
      text: obj[propValue],
    };
  });
}

export const addDataToLocalStorage = <T>(key: string, data: T): void =>
  localStorage.setItem(key, JSON.stringify(data));

export const removeDataFromLocalStorage = (key: string): void =>
  localStorage.removeItem(key);

export const getDataFromLocalStorage = (key: string, fallBackValue: any) =>
  localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) || "{}")
    : fallBackValue;
