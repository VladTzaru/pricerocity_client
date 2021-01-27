import DeliveryNote from "../components/forms/DeliveryNote";
import InvoiceR1 from "../components/forms/InvoiceR1";
import NewItem from "../components/forms/item/NewItem";
import { ComponentMapping } from "../types";

export enum FormsToCro {
  invoice_r1 = "Obrazac R-1",
  delivery_note = "Otpremnica",
  new_item = "Nova stavka",
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
];
