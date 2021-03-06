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
import { v4 as uuidv4 } from "uuid";

const ItemSelection = () => {
  const { items, getItemsFromDB, addItemToInvoice } = useItem();
  const { pathname } = useLocation();
  const invoiceId = replaceStringChunk(pathname, "/print/");

  useEffect(() => {
    getItemsFromDB();
  }, [getItemsFromDB]);

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

        // Add new id so we can have multiple identical items
        // and safe mapping (React list key)
        item.id = uuidv4();

        // Merge items (values from invoice r1 form) and form values
        const updatedItem = {
          ...values,
          ...item,
        };

        // Calculate discounted price
        updatedItem.discountedPrice = +(
          updatedItem.retailPrice *
          ((100 - updatedItem.discount) / 100)
        ).toFixed(2);

        // Calculate totals for each added item
        updatedItem.total = updatedItem.quantity * updatedItem.discountedPrice;

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

          <FormGroup widths={16}>
            <Button
              loading={isSubmitting}
              compact
              basic
              size='large'
              disabled={isSubmitting || !dirty || !isValid}
              type='submit'
            >
              {isSubmitting ? LOADING : "Dodaj stavku"}
            </Button>
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
};

export default ItemSelection;
