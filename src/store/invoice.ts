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
  draftedInvoices: InvoiceR1[];
  draftInvoice: (document: InvoiceR1) => void;
  selectDraftedInvoice: (id: string, list: InvoiceR1[]) => InvoiceR1;
  addNewInvoiceToDB: (newInvoice: InvoiceR1) => Promise<void>;
}

export const useInvoice = create<InvoiceStoreType>((set, get) => ({
  draftedInvoices: getDataFromLocalStorage<[]>(LOCAL_STORAGE_INVOICES, []),

  draftInvoice: (invoice) => {
    const { draftedInvoices } = get();
    set({ draftedInvoices: [...draftedInvoices, invoice] });
    addDataToLocalStorage<InvoiceR1[]>(LOCAL_STORAGE_INVOICES, [
      ...draftedInvoices,
      invoice,
    ]);
  },

  selectDraftedInvoice: (id, list) => {
    const invoice = list.filter((list) => list._id === id);
    return invoice[0];
  },

  addNewInvoiceToDB: async (invoice) => {
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
