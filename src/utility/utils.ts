import { DateFormat, InvoiceR1 } from "../types";
import { format } from "date-fns";
import { LOCAL_STORAGE_INVOICES } from "../constants";

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

export const addDataToLocalStorage = <T>(key: string, data: T) =>
  localStorage.setItem(key, JSON.stringify(data));

export const removeInvoiceFromLocalStorage = (id: string) => {
  const updated = getDataFromLocalStorage<InvoiceR1[]>(
    LOCAL_STORAGE_INVOICES,
    []
  ).filter((i) => i._id !== id);
  addDataToLocalStorage(LOCAL_STORAGE_INVOICES, updated);
};

export const removeDataFromLocalStorage = (key: string) =>
  localStorage.removeItem(key);

export const getDataFromLocalStorage = <T>(
  key: string,
  fallBackValue: T
): T => {
  let data;
  localStorage.getItem(key)
    ? (data = JSON.parse(localStorage.getItem(key) || "[]"))
    : (data = fallBackValue);
  return data;
};

export const formatNumber = (num: number) =>
  Number(num)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
