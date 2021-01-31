import React from "react";
import { Formik, Form } from "formik";
import InputField from "../../form/InputField";
import { Button, FormGroup, Header } from "semantic-ui-react";
import axios from "axios";
import { LOADING } from "../../../constants";
import { ItemValues } from "../../../types";
import { itemValidationSchema } from "../../../validation/formValidationSchemas";

const initialValues: ItemValues = {
  itemNameCro: "",
  itemNameEng: "",
  retailPrice: 0,
  vat: 0,
};

const NewItem = () => {
  const addNewItem = async (item: ItemValues) => {
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
      validationSchema={itemValidationSchema}
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
            {isSubmitting ? LOADING : "Dodaj stavku"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewItem;