import axios from "axios";
import create from "zustand";
import { Buyer } from "../types";

type BuyerStoreType = {
  buyers: Buyer[];
  getBuyers: (searchTerm: string) => Promise<void>;
  addNewBuyer: (buyer: Buyer) => Promise<void>;
};

export const useBuyer = create<BuyerStoreType>((set) => ({
  buyers: [],
  getBuyers: async (searchTerm) => {
    try {
      const { data } = await axios.get<Buyer[]>(
        `${process.env.REACT_APP_API}/${searchTerm}`
      );
      set({ buyers: data });
    } catch (error) {
      console.log(error);
    }
  },
  addNewBuyer: async (buyer) => {
    try {
      await axios.post(`${process.env.REACT_APP_API}/buyer/new`, buyer, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
}));
