import {
  SelectionOptions,
  PaymentMethods,
  InvoiceNumberSuffix,
} from "../../../types";

export const paymentMethods: SelectionOptions<PaymentMethods>[] = [
  {
    key: PaymentMethods.TRANSACTION_ACCOUNT,
    value: PaymentMethods.TRANSACTION_ACCOUNT,
    text: PaymentMethods.TRANSACTION_ACCOUNT,
  },
  {
    key: PaymentMethods.COMPENSATION,
    value: PaymentMethods.COMPENSATION,
    text: PaymentMethods.COMPENSATION,
  },
  {
    key: PaymentMethods.PAYPAL_WEB,
    value: PaymentMethods.PAYPAL_WEB,
    text: PaymentMethods.PAYPAL_WEB,
  },
  {
    key: PaymentMethods.CARD_WEB,
    value: PaymentMethods.CARD_WEB,
    text: PaymentMethods.CARD_WEB,
  },
  {
    key: PaymentMethods.CASH_ON_DELIVERY,
    value: PaymentMethods.CASH_ON_DELIVERY,
    text: PaymentMethods.CASH_ON_DELIVERY,
  },
];

export const invoiceTypes: SelectionOptions<InvoiceNumberSuffix>[] = [
  {
    key: "1/1",
    value: "1/1",
    text: "1/1",
    label: {
      circular: true,
      color: "blue",
      empty: true,
    },
  },
  {
    key: "1/2",
    value: "1/2",
    text: "1/2",
    label: {
      circular: true,
      color: "orange",
      empty: true,
    },
  },
];
