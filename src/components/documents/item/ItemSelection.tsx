import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { Button, FormGroup } from "semantic-ui-react";
import { LOADING, LOCAL_STORAGE_INVOICES } from "../../../constants";
import InputField from "../../form/InputField";
import { ItemSelectionSchema } from "../../../validation/formValidationSchemas";
import SelectInput from "../../form/SelectInput";
import { useItem } from "../../../store/item";
import {
  createSelectionOptions,
  getDataFromLocalStorage,
  addDataToLocalStorage,
  replaceStringChunk,
} from "../../../utility/utils";
import { UMList } from "./config";
import { initialValues } from "./config";
import { InvoiceR1 } from "../../../types";
import { useLocation } from "react-router-dom";

const ItemSelection = () => {
  const { items, getItems, addItemToInvoice } = useItem();
  const { pathname } = useLocation();
  const invoiceId = replaceStringChunk(pathname, "/print/");

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <Formik
      validationSchema={ItemSelectionSchema}
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        let updatedLocalStorage = [];

        // Get invoices from localStorage
        const LSInvoices = getDataFromLocalStorage<InvoiceR1[]>(
          LOCAL_STORAGE_INVOICES,
          []
        );

        // Get the correct invoice
        const invoice = LSInvoices.filter((i) => i._id === invoiceId)[0];

        // Get the correct item
        const item = items.filter((i) => i.itemNameCro === values.itemName)[0];

        // Merge items (values from invoice r1 form) and form values
        const updatedItem = {
          ...values,
          ...item,
        };

        // Push the item into LS invoice item list
        invoice.items.push(updatedItem);

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

        addItemToInvoice(updatedItem);
        actions.resetForm();
      }}
    >
      {({ dirty, isValid, isSubmitting }) => (
        <Form className='ui mini form'>
          <FormGroup widths='equal'>
            <SelectInput
              label='Naziv proizvoda'
              options={createSelectionOptions(items, "itemNameCro")}
              name='itemName'
            />
            <InputField
              disabled={isSubmitting}
              type='number'
              name='quantity'
              label='Količina'
            />
          </FormGroup>

          <FormGroup widths={2}>
            <SelectInput label='Jedinica mjere' options={UMList} name='unit' />
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
