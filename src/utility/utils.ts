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
