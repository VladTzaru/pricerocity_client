import { DateFormat } from "../types";
import { format } from "date-fns";

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

export const formatDate = (date: Date | string, dateFormat: DateFormat) =>
  format(new Date(date), dateFormat);

export const addDataToLocalStorage = <T>(key: string, data: T): void =>
  localStorage.setItem(key, JSON.stringify(data));

export const removeDataFromLocalStorage = (key: string): void =>
  localStorage.removeItem(key);

export const getDataFromLocalStorage = <T>(key: string, fallBackValue: T) =>
  localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) || "[]")
    : fallBackValue;
