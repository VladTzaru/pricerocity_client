import axios from "axios";
import create, { State } from "zustand";
import { LOCAL_STORAGE_SELECTED_INVOICE } from "../constants";
import { InvoiceR1 } from "../types";
import {
  addDataToLocalStorage,
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
} from "../utility/utils";

interface InvoiceStoreType extends State {
  selectedInvoice: InvoiceR1 | null;
  selectInvoice: (document: InvoiceR1) => void;
  addNewInvoice: (newDocument: InvoiceR1) => Promise<void>;
}

export const useInvoice = create<InvoiceStoreType>((set) => ({
  selectedInvoice: getDataFromLocalStorage(LOCAL_STORAGE_SELECTED_INVOICE, {}),
  selectInvoice: (invoice) => {
    addDataToLocalStorage(LOCAL_STORAGE_SELECTED_INVOICE, invoice);
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
      removeDataFromLocalStorage(LOCAL_STORAGE_SELECTED_INVOICE);
    } catch (error) {
      console.log(error);
    }
  },
}));
