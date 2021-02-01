import React from "react";
import { useLocation } from "react-router-dom";
import { Grid, Header } from "semantic-ui-react";
import {
  INVOICE_R1,
  PLASINIA_ADDRESS,
  PLASINIA_INFORMATION,
} from "../constants";
import { useInvoice } from "../store/invoice";
import { DateFormat, DocumentType, InvoiceR1 } from "../types";
import { formatDate, replaceStringChunk } from "../utility/utils";

const selectInvoice = (id: string, list: InvoiceR1[]): InvoiceR1 => {
  const invoice = list.filter((list) => list._id === id);
  return invoice[0];
};

const PrintPage = () => {
  const { selectedInvoices } = useInvoice();
  const { pathname } = useLocation();
  const invoiceId = replaceStringChunk(pathname, "/print/");
  const selectedInvoice = selectInvoice(invoiceId, selectedInvoices);

  return (
    <div className='page'>
      <div className='subpage'>
        <Grid>
          {/* GENERAL INFO */}
          <Grid.Row>
            <Grid.Column width={16}>{PLASINIA_INFORMATION}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column floated='left' width={5}>
              {PLASINIA_ADDRESS}
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
              PLASINIA
            </Grid.Column>
          </Grid.Row>

          {/* DOCUMENT NAME */}
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as='h2'>
                {selectedInvoice?.documentType === DocumentType.INVOICE_R1
                  ? INVOICE_R1
                  : selectedInvoice.documentType}
              </Header>
            </Grid.Column>
          </Grid.Row>

          {/* DOCUMENT INFO */}
          <Grid.Row>
            <Grid.Column floated='left' width={6}>
              Datum: {formatDate(selectedInvoice.date, DateFormat.MM_DD_YYYY)}
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
              PLASINIA
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default PrintPage;
