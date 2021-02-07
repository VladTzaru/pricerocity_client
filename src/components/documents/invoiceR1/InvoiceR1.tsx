import React from "react";
import { Formik, Form } from "formik";
import InputField from "../../form/InputField";
import { Button, FormGroup, Header } from "semantic-ui-react";
import { useBuyer } from "../../../store/buyer";
import SelectInput from "../../form/SelectInput";
import {
  DateFormat,
  InvoiceR1 as InvoiceR1Type,
  DocumentType,
  PaymentMethods,
} from "../../../types";
import { createSelectionOptions } from "../../../utility/utils";
import { paymentMethods, invoiceTypes } from "./config";
import { invoiceR1Schema } from "../../../validation/formValidationSchemas";
import DateInput from "../../form/DateInput";
import InvoiceR1DependentField from "./InvoiceR1DependentField";
import { useInvoice } from "../../../store/invoice";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const InvoiceR1 = () => {
  const { buyers } = useBuyer();
  const history = useHistory();
  const { draftInvoice, issuedInvoices } = useInvoice();

  const initialValues: InvoiceR1Type = {
    _id: "",
    buyer: "",
    buyerName: "",
    recipient: "",
    date: new Date(),
    paymentDeadline: 0,
    paymentDeadlineDate: new Date(),
    invoiceNumberPrefix: issuedInvoices.length + 1,
    invoiceNumberSuffix: "1/1",
    documentType: DocumentType.INVOICE_R1,
    paymentMethod: PaymentMethods.TRANSACTION_ACCOUNT,
    invoiceIssuedAt: new Date(),
    summary: {
      totalWithoutVat: 0,
      totalVat: 0,
      totalWithVAT: 0,
      shipping: 0,
    },
    items: [],
    notes: "",
  };

  return (
    <Formik
      validationSchema={invoiceR1Schema}
      initialValues={initialValues}
      onSubmit={(values) => {
        const buyerInfo = buyers.filter(
          (buyer) => buyer.name === values.buyerName
        );
        values.buyer = buyerInfo[0].id;
        values._id = uuidv4();
        draftInvoice(values);
        history.push(`/print/${values._id}`);
      }}
    >
      {({ dirty, isSubmitting, isValid }) => (
        <Form className='ui form'>
          <Header as='h2'>Podaci o računu</Header>

          <FormGroup widths={2}>
            <SelectInput
              label='Kupac'
              options={createSelectionOptions(buyers, "name")}
              name='buyerName'
            />
            <InvoiceR1DependentField label='Primaoc' name='recipient' />
          </FormGroup>
          <FormGroup widths={2}>
            <DateInput
              withPortal
              todayButton='Danas'
              peekNextMonth
              showMonthDropdown
              dateFormat={DateFormat.MM_DD_YYYY}
              name='date'
              label='Datum'
            />
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

          <FormGroup widths={3}>
            <DateInput
              withPortal
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={5}
              timeCaption='Vrijeme'
              dateFormat={DateFormat.HH_mm}
              name='invoiceIssuedAt'
              label='Vrijeme izdavanja'
            />
            <InvoiceR1DependentField
              disabled
              label='Valuta računa'
              name='paymentDeadlineDate'
            />
            <InputField name='notes' label='Napomene' />
          </FormGroup>

          <Button
            loading={isSubmitting}
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
