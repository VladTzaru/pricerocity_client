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
  zipCode: Yup.string().matches(REGX_ONLY_NUMBERS, "Unesi broj"),
  phoneNumber: Yup.string().matches(REGX_ONLY_NUMBERS, "Unesi broj"),
});
