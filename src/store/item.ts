import axios from "axios";
import create, { State } from "zustand";
import { InvoiceItems } from "../components/documents/item/config";
import { ItemValues } from "../components/documents/item/NewItem";
import { InvoiceItem, Item } from "../types";

interface ItemStoreType extends State {
  items: ItemValues[];
  invoiceItems: InvoiceItems[];
  addItem: (item: ItemValues) => Promise<void>;
  getItems: () => Promise<void>;
  addItemToInvoice: (item: InvoiceItems) => void;
  getInvoiceItems: () => InvoiceItem[];
}

export const useItem = create<ItemStoreType>((set, get) => ({
  items: [],
  invoiceItems: [],
  addItem: async (item) => {
    const { items } = get();
    try {
      await axios.post<Item[]>(`${process.env.REACT_APP_API}/item/new`, item, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      set({ items: [...items, item] });
    } catch (error) {
      console.log(error);
    }
  },

  getItems: async () => {
    try {
      const { data } = await axios.get<Item[]>(
        `${process.env.REACT_APP_API}/item`
      );

      set({ items: data });
    } catch (error) {
      console.log(error);
    }
  },

  addItemToInvoice: (item: InvoiceItems) => {
    const { invoiceItems } = get();
    set({ invoiceItems: [...invoiceItems, item] });
  },

  getInvoiceItems: () => {
    const { invoiceItems } = get();
    return invoiceItems;
  },
}));
