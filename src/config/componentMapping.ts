import NewBuyer from "../components/documents/buyer/NewBuyer";
import DeliveryNote from "../components/documents/DeliveryNote";
import InvoiceR1 from "../components/documents/invoiceR1/InvoiceR1";
import NewItem from "../components/documents/item/NewItem";
import { ComponentMapping } from "../types";

export enum FormsToCro {
  invoice_r1 = "Obrazac R-1",
  delivery_note = "Otpremnica",
  new_item = "Nova stavka",
  new_buyer = "Novi kupac",
}

export const componentMapping: ComponentMapping[] = [
  {
    id: "invoice_r1",
    name: InvoiceR1,
  },
  {
    id: "delivery_note",
    name: DeliveryNote,
  },
  {
    id: "new_item",
    name: NewItem,
  },
  {
    id: "new_buyer",
    name: NewBuyer,
  },
];
