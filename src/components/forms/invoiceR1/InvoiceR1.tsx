import React from "react";
import { Formik, Form } from "formik";
import InputField from "../../InputField";
import { Button, FormGroup, Header, Icon } from "semantic-ui-react";
import { useBuyer } from "../../../store/buyer";
import SelectInput from "../../SelectInput";
import { InvoiceR1 as InvoiceR1Type } from "../../../types";
import { createSelectionOptions } from "../../../utility/utils";
import axios from "axios";
import { paymentMethods, initialValues, invoiceTypes } from "./config";
import { invoiceR1Schema } from "../../../validation/formValidationSchemas";
import DateInput from "../../DateInput";

const addNewInvoice = async (invoice: InvoiceR1Type) => {
  const { buyerName, ...updatedInvoice } = invoice;
  console.log(updatedInvoice);
  try {
    const { data } = await axios.post<InvoiceR1Type>(
      `${process.env.REACT_APP_API}/invoice/new`,
      updatedInvoice,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const InvoiceR1 = () => {
  const { buyers } = useBuyer();

  return (
    <Formik
      validationSchema={invoiceR1Schema}
      initialValues={initialValues}
      onSubmit={(values) => {
        const buyerInfo = buyers.filter(
          (buyer) => buyer.name === values.buyerName
        );
        values.buyer = buyerInfo[0].id;
        addNewInvoice(values);
      }}
    >
      {({ dirty, isValid, values, setFieldValue }) => (
        <Form className='ui form'>
          <Header as='h2'>Podaci o računu</Header>

          <div className='mb-2'>
            <Button
              onClick={() => setFieldValue("recipient", values.buyerName)}
              primary
              type='button'
              animated='vertical'
            >
              <Button.Content hidden>Kopiraj</Button.Content>
              <Button.Content visible>
                <Icon name='copy' />
              </Button.Content>
            </Button>
          </div>

          <FormGroup widths={2}>
            <SelectInput
              label='Kupac'
              options={createSelectionOptions(buyers, "name")}
              name='buyerName'
            />

            <InputField name='recipient' label='Primaoc' />
          </FormGroup>
          <FormGroup widths={2}>
            <DateInput type='date' name='date' label='Datum' />
            <InputField
              type='number'
              name='paymentDeadline'
              label='Rok plaćanja (u danima)'
            />
          </FormGroup>

          <FormGroup widths={3}>
            <InputField
              type='number'
              name='invoiceNumberPrefix'
              label='Broj računa (prefiks)'
            />
            <SelectInput
              label='Broj računa (sufiks)'
              options={invoiceTypes}
              name='invoiceNumberSuffix'
            />
            <SelectInput
              label='Metod plaćanja'
              options={paymentMethods}
              name='paymentMethod'
            />
          </FormGroup>

          <FormGroup widths={2}>
            <InputField
              name='invoiceIssuedAt'
              label='Vrijeme izdavanja računa'
            />
            <InputField name='notes' label='Napomene' />
          </FormGroup>

          <Button
            primary
            size='large'
            disabled={!dirty || !isValid}
            type='submit'
          >
            Napravi Račun
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default InvoiceR1;
