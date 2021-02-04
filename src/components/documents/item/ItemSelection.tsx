import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { Button, FormGroup } from "semantic-ui-react";
import { LOADING } from "../../../constants";
import InputField from "../../form/InputField";
import { ItemSelectionSchema } from "../../../validation/formValidationSchemas";
import SelectInput from "../../form/SelectInput";
import { useItem } from "../../../store/item";
import { createSelectionOptions } from "../../../utility/utils";
import { UMList } from "./config";
import { initialValues } from "./config";

const ItemSelection = () => {
  const { items, getItems, addItemToInvoice } = useItem();

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <Formik
      validationSchema={ItemSelectionSchema}
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        const item = items.filter((i) => i.itemNameCro === values.itemName)[0];
        const updatedItem = {
          ...values,
          ...item,
        };

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
