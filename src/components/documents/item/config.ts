import { InvoiceItem, SelectionOptions } from "../../../types";

export interface InvoiceItems extends InvoiceItem {}

export const initialValues: InvoiceItems = {
  itemNameCro: "",
  itemNameEng: "",
  retailPrice: 0,
  vat: 0,
  itemName: "",
  quantity: 0,
  unit: "",
  discount: 0,
  discountedPrice: 0,
  total: 0,
};

export const UMList: SelectionOptions<string>[] = [
  {
    key: "kom",
    value: "kom",
    text: "kom",
  },
  {
    key: "ml",
    value: "ml",
    text: "ml",
  },
  {
    key: "kg",
    value: "kg",
    text: "kg",
  },
  {
    key: "stavka",
    value: "stavka",
    text: "stavka",
  },
];
