import * as Yup from "yup";

const REGX_ONLY_NUMBERS = /^[0-9]+$/;

export const itemValidationSchema = Yup.object().shape({
  itemNameCro: Yup.string().required("Naziv proizvoda (HRV) je obavezno uneti"),
  itemNameEng: Yup.string().required("Naziv proizvoda (ENG) je obavezno uneti"),
  retailPrice: Yup.number().required("MPC je obavezno uneti"),
  vat: Yup.number().required("PDV je obavezno uneti"),
});

export const buyerValidationSchema = Yup.object().shape({
  name: Yup.string().required("Ime je obavezno uneti"),
  address: Yup.string().required("Adresu je obavezno uneti"),
  city: Yup.string().required("Grad je obavezno uneti"),
  country: Yup.string().required("Zemlju je obavezno uneti"),
  type: Yup.string().required("Tip je obavezno uneti"),
  zipCode: Yup.string()
    .required("Poštanski broj je obavezno uneti")
    .matches(REGX_ONLY_NUMBERS, "Unesi broj"),
  phoneNumber: Yup.string().matches(REGX_ONLY_NUMBERS, "Unesi broj"),
  vatNumber: Yup.string().matches(REGX_ONLY_NUMBERS, "Unesi OIB"),
});

export const invoiceR1Schema = Yup.object().shape({
  buyerName: Yup.string().required("Kupca je obavezno uneti"),
  recipient: Yup.string().required("Primaoca je obavezno uneti"),
  date: Yup.date().required("Datum je obavezno uneti").nullable(),
  paymentDeadline: Yup.number()
    .min(0, "Negativni brojevi nisu dozovljeni")
    .required("Rok plaćanja je obavezno uneti"),
  paymentDeadlineDate: Yup.string().required("Obavezno polje"),
  invoiceNumberPrefix: Yup.number()
    .min(1, "Minimalna vrijednost je 1")
    .required("Obavezno polje"),
  invoiceNumberSuffix: Yup.string().required("Obavezno polje"),
  documentType: Yup.string().required(),
  paymentMethod: Yup.string().required("Obavezno polje"),
  invoiceIssuedAt: Yup.date().required("Obavezno polje").nullable(),
});

export const ItemSelectionSchema = Yup.object().shape({
  itemName: Yup.string().required("Obavezno polje"),
  quantity: Yup.number()
    .min(0, "Negativni brojevi nisu dozovljeni")
    .required("Obavezno polje"),
  unit: Yup.string().required("Obavezno polje"),
  discount: Yup.number()
    .min(0, "Negativni brojevi nisu dozovljeni")
    .required("Obavezno polje"),
});
