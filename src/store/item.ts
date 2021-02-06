import axios from "axios";
import create, { State } from "zustand";
import { InvoiceItem, Item } from "../types";

interface ItemStoreType extends State {
  items: InvoiceItem[];
  invoiceItems: InvoiceItem[];
  addItemToDB: (item: Item) => Promise<void>;
  getItemsFromDB: () => Promise<void>;
  addItemToInvoice: (item: InvoiceItem) => void;
  getInvoiceItems: () => InvoiceItem[];
}

export const useItem = create<ItemStoreType>((set, get) => ({
  items: [],
  invoiceItems: [],
  addItemToDB: async (item) => {
    try {
      await axios.post<Item[]>(`${process.env.REACT_APP_API}/item/new`, item, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  getItemsFromDB: async () => {
    try {
      const { data } = await axios.get<InvoiceItem[]>(
        `${process.env.REACT_APP_API}/item`
      );

      set({ items: data });
    } catch (error) {
      console.log(error);
    }
  },

  addItemToInvoice: (item: InvoiceItem) => {
    const { invoiceItems } = get();
    set({ invoiceItems: [...invoiceItems, item] });
  },

  getInvoiceItems: () => {
    const { invoiceItems } = get();
    return invoiceItems;
  },
}));
