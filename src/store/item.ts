import axios from "axios";
import create, { State } from "zustand";
import { ItemValues } from "../components/documents/item/NewItem";
import { Item } from "../types";

interface ItemStoreType extends State {
  items: ItemValues[];
  addItem: (item: ItemValues) => Promise<void>;
  getItems: () => Promise<void>;
}

export const useItem = create<ItemStoreType>((set, get) => ({
  items: [],
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
}));
