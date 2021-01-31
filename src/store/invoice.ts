import axios from "axios";
import create, { State } from "zustand";
import { InvoiceR1 } from "../types";

interface InvoiceStoreType extends State {
  selectedInvoice: InvoiceR1 | null;
  selectInvoice: (document: InvoiceR1) => void;
  addNewInvoice: (newDocument: InvoiceR1) => Promise<void>;
}

export const useInvoice = create<InvoiceStoreType>((set) => ({
  selectedInvoice: null,
  selectInvoice: (invoice) => {
    set({ selectedInvoice: invoice });
  },
  addNewInvoice: async (invoice: InvoiceR1) => {
    try {
      const { data } = await axios.post<InvoiceR1>(
        `${process.env.REACT_APP_API}/invoice/new`,
        invoice,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      set({ selectedInvoice: data });
    } catch (error) {
      console.log(error);
    }
  },
}));
