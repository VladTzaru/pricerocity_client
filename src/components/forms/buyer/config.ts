import { Buyer, SelectionOptions, BuyerType } from "../../../types";

export const initialValues: Buyer = {
  name: "",
  address: "",
  city: "",
  country: "",
  type: "Pravno lice",
  zipCode: "",
  phoneNumber: "",
  vatNumber: "",
};

export const buyerTypes: SelectionOptions<BuyerType>[] = [
  {
    key: "Pravno lice",
    value: "Pravno lice",
    text: "Pravno lice",
    label: {
      circular: true,
      color: "blue",
      empty: true,
    },
  },
  {
    key: "Privatno lice",
    value: "Privatno lice",
    text: "Privatno lice",
    label: {
      circular: true,
      color: "orange",
      empty: true,
    },
  },
];
