import axios from "axios";
import create, { State } from "zustand";
import { Buyer } from "../types";

interface BuyerStoreType extends State {
  buyers: Buyer[];
  getBuyers: () => Promise<void>;
  addNewBuyer: (newBuyer: Buyer) => Promise<void>;
}

export const useBuyer = create<BuyerStoreType>((set) => ({
  buyers: [],
  getBuyers: async () => {
    try {
      const { data } = await axios.get<Buyer[]>(
        `${process.env.REACT_APP_API}/buyer`
      );
      set({ buyers: data });
    } catch (error) {
      console.log(error);
    }
  },
  addNewBuyer: async (newBuyer) => {
    try {
      const { data } = await axios.post<Buyer>(
        `${process.env.REACT_APP_API}/buyer/new`,
        newBuyer,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      set((state) => ({ buyers: [...state.buyers, data] }));
    } catch (error) {
      console.log(error);
    }
  },
}));
