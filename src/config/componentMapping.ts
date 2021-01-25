import DeliveryNote from "../components/forms/DeliveryNote";
import InvoiceR1 from "../components/forms/InvoiceR1";
import { ComponentMapping } from "../types";

const componentMapping: ComponentMapping[] = [
  {
    id: "invoice_r1",
    name: InvoiceR1,
  },
  {
    id: "delivery_note",
    name: DeliveryNote,
  },
];

export default componentMapping;