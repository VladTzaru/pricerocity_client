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
  issuedInvoices: InvoiceR1[];
  getDraftedInvoices: () => InvoiceR1[];
  getIssuedInvoices: () => Promise<void>;
  draftInvoice: (document: InvoiceR1) => void;
  selectDraftedInvoice: (id: string) => InvoiceR1;
  addNewInvoiceToDB: (newInvoice: InvoiceR1) => Promise<void>;
}

export const useInvoice = create<InvoiceStoreType>((set, get) => ({
  draftedInvoices: getDataFromLocalStorage<[]>(LOCAL_STORAGE_INVOICES, []),

  issuedInvoices: [],

  getDraftedInvoices: () => {
    const { draftedInvoices } = get();
    return draftedInvoices;
  },

  getIssuedInvoices: async () => {
    try {
      const { data } = await axios.get<InvoiceR1[]>(
        `${process.env.REACT_APP_API}/invoice`
      );
      set({ issuedInvoices: data });
    } catch (error) {
      console.log(error);
    }
  },

  draftInvoice: (invoice) => {
    const { draftedInvoices } = get();
    set({ draftedInvoices: [...draftedInvoices, invoice] });
    addDataToLocalStorage<InvoiceR1[]>(LOCAL_STORAGE_INVOICES, [
      ...draftedInvoices,
      invoice,
    ]);
  },

  selectDraftedInvoice: (id) => {
    const { draftedInvoices } = get();
    return draftedInvoices.filter((i) => i._id === id)[0];
  },

  addNewInvoiceToDB: async (invoice) => {
    const { _id, ...rest } = invoice;
    try {
      await axios.post<InvoiceR1>(
        `${process.env.REACT_APP_API}/invoice/new`,
        rest,
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
