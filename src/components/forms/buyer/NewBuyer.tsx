import React from "react";
import { Formik, Form } from "formik";
import InputField from "../../InputField";
import { Button, FormGroup, Header } from "semantic-ui-react";
import { LOADING } from "../../../constants";
import { Buyer, BuyerType, SelectionOptions } from "../../../types";
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
  vatNumber: "",
};

const buyerTypes: SelectionOptions<BuyerType>[] = [
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

const NewBuyer = () => {
  const addNewBuyer = async (buyer: Buyer) => {
    try {
      await axios.post(`${process.env.REACT_APP_API}/buyer/new`, buyer, {
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
      {({ dirty, isValid, isSubmitting, values }) => (
        <Form className='ui form'>
          <Header as='h2'>Podaci o kupcu</Header>
          <FormGroup widths={2}>
            <InputField disabled={isSubmitting} name='name' label='Ime' />
            <InputField disabled={isSubmitting} name='address' label='Adresa' />
            {values.type === "Pravno lice" && (
              <InputField
                disabled={isSubmitting}
                name='vatNumber'
                label='OIB'
              />
            )}
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
