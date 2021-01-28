import React from "react";
import { Formik, Form } from "formik";
import InputField from "../../InputField";
import { Button, FormGroup, Header } from "semantic-ui-react";
import { LOADING } from "../../../constants";
import { Buyer } from "../../../types";
import { buyerValidationSchema } from "../../../validation/formValidationSchemas";
import SelectInput from "../../SelectInput";
import axios from "axios";

const initialValues: Buyer = {
  name: "",
  address: "",
  city: "",
  country: "",
  type: "Pravno lice",
  zipCode: "",
  phoneNumber: "",
};

const buyerTypes = [
  {
    key: "Pravno lice",
    text: "Pravno lice",
    value: "Pravno lice",
    label: { color: "blue", empty: true, circular: true },
  },
  {
    key: "Privatno lice",
    text: "Privatno lice",
    value: "Privatno lice",
    label: { color: "orange", empty: true, circular: true },
  },
];

const NewBuyer = () => {
  const addNewBuyer = async (buyer: Buyer) => {
    try {
      await axios.post(`${process.env.REACT_APP_API}/item/new`, buyer, {
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
      validationSchema={buyerValidationSchema}
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        addNewBuyer(values);
        actions.resetForm();
      }}
    >
      {({ dirty, isValid, isSubmitting }) => (
        <Form className='ui form'>
          <Header as='h2'>Podaci o kupcu</Header>
          <FormGroup widths={2}>
            <InputField disabled={isSubmitting} name='name' label='Ime' />
            <InputField disabled={isSubmitting} name='address' label='Adresa' />
          </FormGroup>

          <FormGroup widths={2}>
            <InputField disabled={isSubmitting} name='city' label='Grad' />
            <InputField disabled={isSubmitting} name='country' label='Zemlja' />
            <InputField
              disabled={isSubmitting}
              name='zipCode'
              label='Poštanski broj'
            />
          </FormGroup>

          <FormGroup widths={2}>
            <SelectInput label='Tip' options={buyerTypes} name='type' />

            <InputField
              disabled={isSubmitting}
              name='phoneNumber'
              label='Telefon'
            />
          </FormGroup>

          <Button
            loading={isSubmitting}
            primary
            size='large'
            disabled={isSubmitting || !dirty || !isValid}
            type='submit'
          >
            {isSubmitting ? LOADING : "Dodaj kupca"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewBuyer;
