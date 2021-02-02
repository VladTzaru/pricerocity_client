import React from "react";
import { Formik, Form } from "formik";
import { Button, FormGroup } from "semantic-ui-react";
import { LOADING } from "../../constants";
import InputField from "../form/InputField";
import { itemValidationSchema } from "../../validation/formValidationSchemas";
import { InvoiceItems } from "../../types";
import SelectInput from "../form/SelectInput";
import { invoiceTypes } from "./invoiceR1/config";

const initialValues: InvoiceItems = {
  productName: "",
  quantity: 0,
  unit: "",
  discount: 0,
};

const ItemSelection = () => {
  const addItemToDocument = async (item: InvoiceItems) => {
    console.log(item);
  };

  return (
    <Formik
      validationSchema={itemValidationSchema}
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        addItemToDocument(values);
        actions.resetForm();
      }}
    >
      {({ dirty, isValid, isSubmitting }) => (
        <Form className='ui mini form'>
          <FormGroup widths='equal'>
            <SelectInput
              label='Naziv proizvoda'
              options={invoiceTypes}
              name='productName'
            />
            <InputField
              disabled={isSubmitting}
              type='number'
              name='quantity'
              label='Količina'
            />
          </FormGroup>

          <FormGroup widths={2}>
            <SelectInput
              label='Jedinica mjere'
              options={invoiceTypes}
              name='unit'
            />
            <InputField
              disabled={isSubmitting}
              type='number'
              name='discount'
              label='Popust'
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

export default ItemSelection;
