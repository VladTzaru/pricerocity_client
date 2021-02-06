import React from "react";
import { Formik, Form } from "formik";
import { FormGroup, Button } from "semantic-ui-react";
import InputField from "../form/InputField";
import { LOCAL_STORAGE_INVOICES } from "../../constants";
import { InvoiceR1 } from "../../types";
import {
  addDataToLocalStorage,
  getDataFromLocalStorage,
  replaceStringChunk,
} from "../../utility/utils";
import { useLocation } from "react-router-dom";
import { ShippingSchema } from "../../validation/formValidationSchemas";

type ShippingType = {
  shipping: number;
};

const initialValues: ShippingType = {
  shipping: 0,
};

const Shipping = () => {
  const { pathname } = useLocation();
  const invoiceId = replaceStringChunk(pathname, "/print/");
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ShippingSchema}
      onSubmit={(values, actions) => {
        let updatedLocalStorage;

        // Get invoices from localStorage
        const LSInvoices = getDataFromLocalStorage<InvoiceR1[]>(
          LOCAL_STORAGE_INVOICES,
          []
        );

        // Get the correct invoice
        const invoice = LSInvoices.filter((i) => i._id === invoiceId)[0];
        invoice.summary.shipping = values.shipping;
        actions.resetForm();

        // Check if we are updating an existing invoice
        // Update if it exists
        for (let i = 0; i < LSInvoices.length; i++) {
          if (LSInvoices[i]._id === invoice._id) {
            LSInvoices[i] = invoice;
          }
        }

        // Update the invoice list
        updatedLocalStorage = [...LSInvoices];

        // Save to localStorage
        addDataToLocalStorage(LOCAL_STORAGE_INVOICES, updatedLocalStorage);
      }}
    >
      {({ dirty, isValid, isSubmitting }) => (
        <Form className='ui mini form'>
          <FormGroup widths='equal'>
            <InputField
              disabled={isSubmitting}
              name='shipping'
              label='Dostava'
            />
            <Button
              loading={isSubmitting}
              compact
              basic
              size='large'
              disabled={isSubmitting || !dirty || !isValid}
              type='submit'
            >
              Unesi
            </Button>
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
};

export default Shipping;
