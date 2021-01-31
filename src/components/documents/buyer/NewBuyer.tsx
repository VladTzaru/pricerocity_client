import React from "react";
import { Formik, Form } from "formik";
import InputField from "../../form/InputField";
import { Button, FormGroup, Header } from "semantic-ui-react";
import { LOADING } from "../../../constants";
import { buyerValidationSchema } from "../../../validation/formValidationSchemas";
import SelectInput from "../../form/SelectInput";
import { useBuyer } from "../../../store/buyer";
import { initialValues, buyerTypes } from "./config";

const NewBuyer = () => {
  const { addNewBuyer } = useBuyer((state) => state);

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
