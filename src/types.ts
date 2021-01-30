export interface MatchParams {
  name: string;
}

export interface ComponentMapping {
  id: string;
  name: React.FC;
}

export interface Item {
  createdAt: string;
  id: string;
  itemNameCro: string;
  itemNameEng: string;
  retailPrice: number;
  updatedAt: string;
  vat: number;
}

export interface ItemValues {
  itemNameCro: string;
  itemNameEng: string;
  retailPrice: number;
  vat: number;
}

export type BuyerType = "Privatno lice" | "Pravno lice";
export type InvoiceNumberSuffix = "1/1" | "1/2";
export type InvoiceType = "OBRAZAC-R1" | "OTPREMNICA" | "PONUDA";

export enum PaymentMethods {
  TRANSACTION_ACCOUNT = "Transakcijski račun",
  COMPENSATION = "Kompenzacija",
  PAYPAL_WEB = "Paypal-web",
  CARD_WEB = "Kartica-web",
  CASH_ON_DELIVERY = "Pouzećem",
}

export interface Buyer {
  id?: string;
  name: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  phoneNumber?: string;
  type: BuyerType;
  vatNumber?: string;
}

export interface InvoiceR1 {
  buyer?: string; // Buyer ID
  buyerName: string;
  recipient: string;
  date: Date;
  paymentDeadline: number;
  invoiceNumberPrefix: number; // 1, 2, 3...
  invoiceNumberSuffix: InvoiceNumberSuffix; // 1/1 and 2/1
  invoiceType: InvoiceType; // OBRAZAC-R1
  paymentMethod: PaymentMethods;
  invoiceIssuedAt: ""; // 12:00
  notes?: string;
}

export interface SelectionOptions<T extends string> {
  key: T;
  text: T;
  value: T;
  label?: {
    color: string;
    empty: boolean;
    circular: boolean;
  };
}

export enum DateFormat {
  MM_DD_YYYY = "dd/MM/yyyy",
  HH_mm = "HH:mm",
}
