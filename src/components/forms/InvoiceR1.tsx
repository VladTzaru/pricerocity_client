import React from "react";
import { Formik, Form } from "formik";
import InputField from "../InputField";
import { Button, FormGroup } from "semantic-ui-react";
import * as Yup from "yup";

interface Values {
  itemNameCro: string;
  itemNameEng: string;
  retailPrice: number;
  vat: number;
}

const initialValues: Values = {
  itemNameCro: "",
  itemNameEng: "",
  retailPrice: 0,
  vat: 0,
};

const validationSchema = Yup.object().shape({
  itemNameCro: Yup.string().required("Naziv proizvoda (HRV) je obavezno uneti"),
  itemNameEng: Yup.string().required("Naziv proizvoda (ENG) je obavezno uneti"),
  retailPrice: Yup.string().required("MPC je obavezno uneti"),
  vat: Yup.string().required("PDV je obavezno uneti"),
});

const InvoiceR1 = () => (
  <Formik
    validationSchema={validationSchema}
    initialValues={initialValues}
    onSubmit={(values) => console.log(values)}
  >
    {({ dirty, isValid }) => (
      <Form className='ui form'>
        <FormGroup widths={2}>
          <InputField name='itemNameCro' label='Naziv proizvoda (HRV)' />
          <InputField name='itemNameEng' label='Naziv Proizvoda (ENG)' />
        </FormGroup>
        <FormGroup widths={2}>
          <InputField type='number' name='retailPrice' label='MPC' />
          <InputField type='number' name='vat' label='PDV' />
        </FormGroup>
        <Button disabled={!dirty || !isValid} type='submit'>
          Submit
        </Button>
      </Form>
    )}
  </Formik>
);

export default InvoiceR1;
