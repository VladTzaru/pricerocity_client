import React from "react";
import { Formik, Form } from "formik";
import InputField from "../InputField";
import { Button, FormGroup, Header } from "semantic-ui-react";
import * as Yup from "yup";

interface Values {
  itemNameCro: string;
  itemNameEng: string;
  retailPrice: number;
  vat: number;
  buyer: string;
  recipient: string;
  date: Date;
  paymentDeadline: number;
  invoiceNumberPrefix: number; // 1, 2, 3...
  invoiceNumberSuffix: string; // 1/1 and 2/1
  invoiceType: string; // OBRAZAC-R1
  paymentMethod: string;
  invoiceIssuedAt: Date; // 12:00
  notes?: string;
}

const initialValues: Values = {
  itemNameCro: "",
  itemNameEng: "",
  retailPrice: 0,
  vat: 0,
  buyer: "",
  recipient: "",
  date: new Date(),
  paymentDeadline: 0,
  invoiceNumberPrefix: 1,
  invoiceNumberSuffix: "1/1",
  invoiceType: "OBRAZAC-R1",
  paymentMethod: "transakcijski račun",
  invoiceIssuedAt: new Date(),
};

const validationSchema = Yup.object().shape({
  itemNameCro: Yup.string().required("Naziv proizvoda (HRV) je obavezno uneti"),
  itemNameEng: Yup.string().required("Naziv proizvoda (ENG) je obavezno uneti"),
  retailPrice: Yup.number().required("MPC je obavezno uneti"),
  vat: Yup.number().required("PDV je obavezno uneti"),
  buyer: Yup.string().required("Kupca je obavezno uneti"),
  recipient: Yup.string().required("Primaoca je obavezno uneti"),
  date: Yup.date().required("Datum je obavezno uneti").nullable(),
  paymentDeadline: Yup.number().required("Rok plaćanja je obavezno uneti"),
});

const InvoiceR1 = () => (
  <Formik
    validationSchema={validationSchema}
    initialValues={initialValues}
    onSubmit={(values) => console.log(values)}
  >
    {({ dirty, isValid }) => (
      <Form className='ui form'>
        <Header as='h2'>Opis Stavke</Header>
        <FormGroup widths={2}>
          <InputField name='itemNameCro' label='Naziv proizvoda (HRV)' />
          <InputField name='itemNameEng' label='Naziv Proizvoda (ENG)' />
        </FormGroup>
        <FormGroup widths={2}>
          <InputField type='number' name='retailPrice' label='MPC' />
          <InputField type='number' name='vat' label='PDV' />
        </FormGroup>

        <Header as='h2'>Podaci o računu</Header>
        <FormGroup widths={2}>
          <InputField name='buyer' label='Kupac' />
          <InputField name='recipient' label='Primaoc' />
        </FormGroup>
        <FormGroup widths={2}>
          <InputField type='date' name='date' label='Datum' />
          <InputField
            type='number'
            name='paymentDeadline'
            label='Rok plaćanja (u danima)'
          />
        </FormGroup>

        <Button
          primary
          size='large'
          disabled={!dirty || !isValid}
          type='submit'
        >
          Napravi Račun
        </Button>
      </Form>
    )}
  </Formik>
);

export default InvoiceR1;
