import React from "react";
import { useLocation } from "react-router-dom";
import { Grid, Header, Table } from "semantic-ui-react";
import SideMenu from "../components/SideMenu";
import {
  INVOICE_R1,
  PLASINIA_ADDRESS,
  PLASINIA_FOR_PAYMENT,
  PLASINIA_INFORMATION,
  PLASINIA_TAX_REGULATIONS,
} from "../constants";
import { useBuyer } from "../store/buyer";
import { useInvoice } from "../store/invoice";
import { Buyer, DateFormat, DocumentType } from "../types";
import {
  formatDate,
  replaceStringChunk,
  roundTo2Digits,
} from "../utility/utils";

const selectBuyer = (name: string, list: Buyer[]): Buyer => {
  const buyer = list.filter((list) => list.name === name);
  return buyer[0];
};

const PrintPage = () => {
  const { draftedInvoices, selectDraftedInvoice } = useInvoice();
  const { buyers } = useBuyer();
  const { pathname } = useLocation();

  const invoiceId = replaceStringChunk(pathname, "/print/");
  const selectedInvoice = selectDraftedInvoice(invoiceId, draftedInvoices);
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
      <div className='print'>
        <Grid>
          {/* GENERAL INFO */}
          <Grid.Row>
            <Grid.Column width={16}>
              <p className='small-text'>{PLASINIA_INFORMATION}</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column floated='left' width={10}>
              <p className='small-text'>{PLASINIA_ADDRESS}</p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              PLASINIA
            </Grid.Column>
          </Grid.Row>

          {/* DOCUMENT NAME */}
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as='h3'>
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
              <p className='small-text'>KUPAC: {formatBuyer()}</p>
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
              <p className='small-text'>PRIMAOC: {formatBuyer()}</p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <p className='small-text'>
                TIP RAČUNA: {selectedInvoice.documentType}
              </p>
              <p className='small-text'>
                BROJ RAČUNA:{" "}
                {`${selectedInvoice.invoiceNumberPrefix}/${selectedInvoice.invoiceNumberSuffix}`}
              </p>
              <p className='small-text'>
                VALUTA RAČUNA: {selectedInvoice.paymentDeadlineDate}
              </p>
              <p className='small-text'>
                NAČIN PLAĆANJA: {selectedInvoice.paymentMethod}
              </p>
              <p className='small-text'>
                RAČUN IZDAT:{" "}
                {formatDate(selectedInvoice.invoiceIssuedAt, DateFormat.HH_mm)}
              </p>
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
                  {selectedInvoice.items.map((item, i) => {
                    return (
                      <Table.Row key={item.id}>
                        <Table.Cell>{i + 1}</Table.Cell>
                        <Table.Cell>{item.itemName}</Table.Cell>
                        <Table.Cell>
                          {item.quantity} {item.unit}
                        </Table.Cell>
                        <Table.Cell>{item.vat}%</Table.Cell>
                        <Table.Cell>{item.retailPrice} kn</Table.Cell>
                        <Table.Cell>{item.discount}%</Table.Cell>
                        <Table.Cell>
                          {roundTo2Digits(
                            item.retailPrice * ((100 - item.discount) / 100)
                          )}{" "}
                          kn
                        </Table.Cell>
                        <Table.Cell>
                          {roundTo2Digits(
                            item.quantity *
                              (item.retailPrice * ((100 - item.discount) / 100))
                          )}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>

          {/* Info about invoice and responsible person and totals */}
          <Grid.Row>
            <Grid.Column width={10}>
              <p className='small-text'>{PLASINIA_TAX_REGULATIONS}</p>
            </Grid.Column>
            <Grid.Column width={6}>
              <p className='small-text'>
                DOSTAVA: {selectedInvoice.summary.shipping}
              </p>
              <p className='small-text'>
                UKUPNO: {selectedInvoice.summary.totalWithoutVat}
              </p>
              <p className='small-text'>
                PDV: {selectedInvoice.summary.totalVat}
              </p>
              <p className='small-text'>
                UKUPNO S PDV-om: {selectedInvoice.summary.totalWithVAT}
              </p>
            </Grid.Column>
          </Grid.Row>

          {/* FOOTER */}
          <Grid.Row>
            <Grid.Column width={10}>
              <p className='small-text'>ZA PLAĆANJE</p>
              <p className='small-text'>{PLASINIA_FOR_PAYMENT}</p>
            </Grid.Column>
          </Grid.Row>
          {selectedInvoice.notes && (
            <Grid.Row>
              <Grid.Column width={16}>
                <p className='small-text'>NAPOMENE</p>
                <p className='small-text'>{selectedInvoice.notes}</p>
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </div>
    </>
  );
};

export default PrintPage;
