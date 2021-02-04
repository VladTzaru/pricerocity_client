import axios from "axios";
import create, { State } from "zustand";
import { LOCAL_STORAGE_INVOICES } from "../constants";
import { InvoiceR1 } from "../types";
import {
  addDataToLocalStorage,
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
} from "../utility/utils";

interface InvoiceStoreType extends State {
  selectedInvoices: InvoiceR1[];
  selectInvoice: (document: InvoiceR1) => void;
  addNewInvoice: (newDocument: InvoiceR1) => Promise<void>;
}

export const useInvoice = create<InvoiceStoreType>((set, get) => ({
  selectedInvoices: getDataFromLocalStorage<[]>(LOCAL_STORAGE_INVOICES, []),

  selectInvoice: (invoice) => {
    const { selectedInvoices } = get();
    set({ selectedInvoices: [...selectedInvoices, invoice] });
    addDataToLocalStorage<InvoiceR1[]>(LOCAL_STORAGE_INVOICES, [
      ...selectedInvoices,
      invoice,
    ]);
  },

  addNewInvoice: async (invoice: InvoiceR1) => {
    try {
      await axios.post<InvoiceR1>(
        `${process.env.REACT_APP_API}/invoice/new`,
        invoice,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      removeDataFromLocalStorage(LOCAL_STORAGE_INVOICES);
    } catch (error) {
      console.log(error);
    }
  },
}));
