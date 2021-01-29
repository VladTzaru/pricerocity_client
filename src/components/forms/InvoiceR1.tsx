import React from "react";
import { Formik, Form } from "formik";
import InputField from "../InputField";
import { Button, FormGroup, Header } from "semantic-ui-react";
import * as Yup from "yup";
import { useBuyer } from "../../store/buyer";
import SelectInput from "../SelectInput";
import {
  InvoiceNumberSuffix,
  InvoiceType,
  PaymentMethods,
  SelectionOptions,
} from "../../types";

interface Values {
  buyer: string;
  recipient: string;
  date: Date;
  paymentDeadline: number;
  invoiceNumberPrefix: number; // 1, 2, 3...
  invoiceNumberSuffix: InvoiceNumberSuffix; // 1/1 and 2/1
  invoiceType: InvoiceType; // OBRAZAC-R1
  paymentMethod: PaymentMethods;
  invoiceIssuedAt: Date; // 12:00
  notes?: string;
}

const initialValues: Values = {
  buyer: "",
  recipient: "",
  date: new Date(),
  paymentDeadline: 0,
  invoiceNumberPrefix: 1,
  invoiceNumberSuffix: "1/1",
  invoiceType: "OBRAZAC-R1",
  paymentMethod: PaymentMethods.TRANSACTION_ACCOUNT,
  invoiceIssuedAt: new Date(),
};

const validationSchema = Yup.object().shape({
  buyer: Yup.string().required("Kupca je obavezno uneti"),
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

const InvoiceR1 = () => {
  const { buyers } = useBuyer();

  const createSelectionOptions = () => {
    return buyers.map((buyer) => {
      return {
        key: buyer.name,
        value: buyer.name,
        text: buyer.name,
      };
    });
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {({ dirty, isValid }) => (
        <Form className='ui form'>
          <Header as='h2'>Podaci o računu</Header>
          <FormGroup widths={2}>
            <SelectInput
              label='Kupac'
              options={createSelectionOptions()}
              name='buyer'
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
              options={createSelectionOptions()}
              name='paymentMethod'
            />
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
