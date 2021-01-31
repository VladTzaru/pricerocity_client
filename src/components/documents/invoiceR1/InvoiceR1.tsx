import React from "react";
import { Formik, Form } from "formik";
import InputField from "../../form/InputField";
import { Button, FormGroup, Header } from "semantic-ui-react";
import { useBuyer } from "../../../store/buyer";
import SelectInput from "../../form/SelectInput";
import { DateFormat } from "../../../types";
import { createSelectionOptions } from "../../../utility/utils";
import { paymentMethods, initialValues, invoiceTypes } from "./config";
import { invoiceR1Schema } from "../../../validation/formValidationSchemas";
import DateInput from "../../form/DateInput";
import InvoiceR1DependentField from "./InvoiceR1DependentField";
import { useInvoice } from "../../../store/invoice";

const InvoiceR1 = () => {
  const { buyers } = useBuyer();
  const { selectInvoice, selectedInvoice } = useInvoice();
  console.log(selectedInvoice);
  return (
    <Formik
      validationSchema={invoiceR1Schema}
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        const buyerInfo = buyers.filter(
          (buyer) => buyer.name === values.buyerName
        );
        values.buyer = buyerInfo[0].id;
        selectInvoice(values);
        actions.resetForm();
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
