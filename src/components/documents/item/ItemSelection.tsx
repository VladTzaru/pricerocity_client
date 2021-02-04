import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { Button, FormGroup } from "semantic-ui-react";
import { LOADING } from "../../../constants";
import InputField from "../../form/InputField";
import { ItemSelectionSchema } from "../../../validation/formValidationSchemas";
import { InvoiceItems } from "../../../types";
import SelectInput from "../../form/SelectInput";
import { useItem } from "../../../store/item";
import { createSelectionOptions } from "../../../utility/utils";
import { UMList } from "./config";

const initialValues: InvoiceItems = {
  itemName: "",
  quantity: 0,
  unit: "",
  discount: 0,
};

const ItemSelection = () => {
  const { items, getItems } = useItem();

  useEffect(() => {
    getItems();
  }, [getItems]);

  const addItemToDocument = async (item: InvoiceItems) => {
    console.log(item);
  };

  return (
    <Formik
      validationSchema={ItemSelectionSchema}
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
