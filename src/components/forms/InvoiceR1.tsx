import React from "react";
import { Formik, Form } from "formik";
import InputField from "../InputField";
import { Button, FormGroup, Header } from "semantic-ui-react";
import * as Yup from "yup";
import { useBuyer } from "../../store/buyer";
import SelectInput from "../SelectInput";
import {
  InvoiceNumberSuffix,
  InvoiceR1 as InvoiceR1Type,
  PaymentMethods,
  SelectionOptions,
} from "../../types";
import { createSelectionOptions } from "../../utility/utils";
import axios from "axios";

const initialValues: InvoiceR1Type = {
  buyer: null,
  buyerName: "",
  recipient: "",
  date: new Date(),
  paymentDeadline: 0,
  invoiceNumberPrefix: 1,
  invoiceNumberSuffix: "1/1",
  invoiceType: "OBRAZAC-R1",
  paymentMethod: PaymentMethods.TRANSACTION_ACCOUNT,
  invoiceIssuedAt: "",
  notes: "",
};

const validationSchema = Yup.object().shape({
  buyerName: Yup.string().required("Kupca je obavezno uneti"),
  recipient: Yup.string().required("Primaoca je obavezno uneti"),
  date: Yup.date().required("Datum je obavezno uneti").nullable(),
  paymentDeadline: Yup.number().required("Rok plaćanja je obavezno uneti"),
});

const invoiceTypes: SelectionOptions<InvoiceNumberSuffix>[] = [
  {
    key: "1/1",
    value: "1/1",
    text: "1/1",
    label: {
      circular: true,
      color: "blue",
      empty: true,
    },
  },
  {
    key: "1/2",
    value: "1/2",
    text: "1/2",
    label: {
      circular: true,
      color: "orange",
      empty: true,
    },
  },
];

const paymentMethods: SelectionOptions<PaymentMethods>[] = [
  {
    key: PaymentMethods.TRANSACTION_ACCOUNT,
    value: PaymentMethods.TRANSACTION_ACCOUNT,
    text: PaymentMethods.TRANSACTION_ACCOUNT,
  },
  {
    key: PaymentMethods.COMPENSATION,
    value: PaymentMethods.COMPENSATION,
    text: PaymentMethods.COMPENSATION,
  },
  {
    key: PaymentMethods.PAYPAL_WEB,
    value: PaymentMethods.PAYPAL_WEB,
    text: PaymentMethods.PAYPAL_WEB,
  },
  {
    key: PaymentMethods.CARD_WEB,
    value: PaymentMethods.CARD_WEB,
    text: PaymentMethods.CARD_WEB,
  },
  {
    key: PaymentMethods.CASH_ON_DELIVERY,
    value: PaymentMethods.CASH_ON_DELIVERY,
    text: PaymentMethods.CASH_ON_DELIVERY,
  },
];

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
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={(values) => {
        const buyerInfo = buyers.filter(
          (buyer) => buyer.name === values.buyerName
        );
        values.buyer = buyerInfo[0];
        addNewInvoice(values);
      }}
    >
      {({ dirty, isValid }) => (
        <Form className='ui form'>
          <Header as='h2'>Podaci o računu</Header>
          <FormGroup widths={2}>
            <SelectInput
              label='Kupac'
              options={createSelectionOptions(buyers, "name")}
              name='buyerName'
            />

            <InputField name='recipient' label='Primaoc' />
          </FormGroup>
          <FormGroup widths={2}>
            <InputField type='date' name='date' label='Datum' />
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
