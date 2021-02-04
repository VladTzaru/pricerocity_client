import axios from "axios";
import create, { State } from "zustand";
import { ItemValues } from "../components/documents/item/NewItem";

interface ItemStoreType extends State {
  items: ItemValues[];
  addItem: (item: ItemValues) => void;
}

export const useItem = create<ItemStoreType>((set, get) => ({
  items: [],
  addItem: async (item: ItemValues) => {
    const { items } = get();
    try {
      await axios.post<ItemValues>(
        `${process.env.REACT_APP_API}/item/new`,
        item,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      set({ items: [...items, item] });
    } catch (error) {
      console.log(error);
    }
  },
}));
