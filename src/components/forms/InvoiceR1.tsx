import React from "react";
import { Formik, Form } from "formik";
import InputField from "../InputField";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";

interface Values {
  itemNameCro: string;
  itemNameEng: string;
  vat: number;
  retailPrice: number;
}

const initialValues: Values = {
  itemNameCro: "",
  itemNameEng: "",
  retailPrice: 0,
  vat: 0,
};

const validationSchema = Yup.object().shape({
  itemNameCro: Yup.string().required("Naziv proizvoda (HRV) je obavezan"),
  itemNameEng: Yup.string().required("Naziv proizvoda (ENG) je obavezan"),
});

const InvoiceR1 = () => (
  <Formik
    validationSchema={validationSchema}
    initialValues={initialValues}
    onSubmit={(values) => console.log(values)}
  >
    {({ isSubmitting, dirty, isValid }) => (
      <Form className='ui form'>
        <InputField name='itemNameCro' label='Naziv proizvoda (HRV)' />
        <InputField name='itemNameEng' label='Naziv Proizvoda (ENG)' />
        <Button
          disabled={isSubmitting || !dirty || !isValid}
          loading={isSubmitting}
          type='submit'
        >
          Submit
        </Button>
      </Form>
    )}
  </Formik>
);

export default InvoiceR1;
