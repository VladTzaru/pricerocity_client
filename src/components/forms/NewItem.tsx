import React from "react";
import { Formik, Form } from "formik";
import InputField from "../InputField";
import { Button, FormGroup, Header } from "semantic-ui-react";
import * as Yup from "yup";
import axios from "axios";

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
  retailPrice: Yup.number().required("MPC je obavezno uneti"),
  vat: Yup.number().required("PDV je obavezno uneti"),
});

const NewItem = () => {
  const addNewItem = async (item: Values) => {
    try {
      await axios.post(`${process.env.REACT_APP_API}/item/new`, item, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        addNewItem(values);
        actions.resetForm();
      }}
    >
      {({ dirty, isValid, isSubmitting }) => (
        <Form className='ui form'>
          <Header as='h2'>Opis Stavke</Header>
          <FormGroup widths={2}>
            <InputField
              disabled={isSubmitting}
              name='itemNameCro'
              label='Naziv proizvoda (HRV)'
            />
            <InputField
              disabled={isSubmitting}
              name='itemNameEng'
              label='Naziv Proizvoda (ENG)'
            />
          </FormGroup>
          <FormGroup widths={2}>
            <InputField
              disabled={isSubmitting}
              type='number'
              name='retailPrice'
              label='MPC'
            />
            <InputField
              disabled={isSubmitting}
              type='number'
              name='vat'
              label='PDV'
            />
          </FormGroup>

          <Button
            loading={isSubmitting}
            primary
            size='large'
            disabled={isSubmitting || !dirty || !isValid}
            type='submit'
          >
            Dodaj stavku
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewItem;
