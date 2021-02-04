import React from "react";
import { useLocation } from "react-router-dom";
import { Grid, Header, Table } from "semantic-ui-react";
import SideMenu from "../components/SideMenu";
import {
  INVOICE_R1,
  PLASINIA_ADDRESS,
  PLASINIA_INFORMATION,
} from "../constants";
import { useBuyer } from "../store/buyer";
import { useInvoice } from "../store/invoice";
import { useItem } from "../store/item";
import { Buyer, DateFormat, DocumentType, InvoiceR1 } from "../types";
import { formatDate, replaceStringChunk } from "../utility/utils";

const selectInvoice = (id: string, list: InvoiceR1[]): InvoiceR1 => {
  const invoice = list.filter((list) => list._id === id);
  return invoice[0];
};

const selectBuyer = (name: string, list: Buyer[]): Buyer => {
  const buyer = list.filter((list) => list.name === name);
  return buyer[0];
};

const PrintPage = () => {
  const { selectedInvoices } = useInvoice();
  const { buyers } = useBuyer();
  const { invoiceItems } = useItem();
  const { pathname } = useLocation();

  const invoiceId = replaceStringChunk(pathname, "/print/");
  const selectedInvoice = selectInvoice(invoiceId, selectedInvoices);
  const selectedBuyer = selectBuyer(selectedInvoice?.buyerName, buyers);

  const formatBuyer = () => {
    if (!selectedBuyer.vatNumber)
      return `${selectedBuyer?.name} ${selectedBuyer.address} ${selectedBuyer.zipCode}, ${selectedBuyer.city}`;
    return `${selectedBuyer?.name} ${selectedBuyer.address} ${selectedBuyer.zipCode}, ${selectedBuyer.city}, OIB: ${selectedBuyer.vatNumber}`;
  };

  if (!selectedInvoice || !selectedBuyer) return <h1>Nemaš dokumenata mala</h1>;

  return (
    <>
      <SideMenu />
      <div className='page'>
        <div className='subpage'>
          <Grid>
            {/* GENERAL INFO */}
            <Grid.Row>
              <Grid.Column width={16}>{PLASINIA_INFORMATION}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column floated='left' width={10}>
                {PLASINIA_ADDRESS}
              </Grid.Column>
              <Grid.Column floated='right' width={6}>
                PLASINIA
              </Grid.Column>
            </Grid.Row>

            {/* DOCUMENT NAME */}
            <Grid.Row>
              <Grid.Column width={16}>
                <Header as='h2'>
                  {selectedInvoice?.documentType === DocumentType.INVOICE_R1
                    ? INVOICE_R1
                    : selectedInvoice?.documentType}
                </Header>
              </Grid.Column>
            </Grid.Row>

            {/* DOCUMENT INFO */}
            <Grid.Row>
              <Grid.Column floated='left' width={16}>
                DATUM: {formatDate(selectedInvoice.date, DateFormat.MM_DD_YYYY)}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column floated='left' width={5}>
                KUPAC: {formatBuyer()}
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                Primaoc: {formatBuyer()}
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                Ostalo:
              </Grid.Column>
            </Grid.Row>

            {/* ITEM LIST */}

            <Grid.Row>
              <Grid.Column floated='left' width={16}>
                <Table
                  striped
                  stackable
                  compact
                  size='small'
                  singleLine
                  collapsing
                  definition
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>#</Table.HeaderCell>
                      <Table.HeaderCell>Naziv proizvoda</Table.HeaderCell>
                      <Table.HeaderCell>Količina</Table.HeaderCell>
                      <Table.HeaderCell>PDV</Table.HeaderCell>
                      <Table.HeaderCell>Cijena</Table.HeaderCell>
                      <Table.HeaderCell>Popust</Table.HeaderCell>
                      <Table.HeaderCell>Cijena s popustom</Table.HeaderCell>
                      <Table.HeaderCell>Ukupno</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {invoiceItems.map((item) => {
                      return (
                        <Table.Row key={item.id}>
                          <Table.Cell></Table.Cell>
                          <Table.Cell>{item.itemName}</Table.Cell>
                          <Table.Cell>{item.quantity}</Table.Cell>
                          <Table.Cell>{item.vat}</Table.Cell>
                          <Table.Cell>{item.retailPrice}</Table.Cell>
                          <Table.Cell>{item.discount}</Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default PrintPage;
