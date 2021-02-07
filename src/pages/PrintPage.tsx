import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Header, Table } from "semantic-ui-react";
import SideMenu from "../components/SideMenu";
import {
  INVOICE_R1,
  PLASINIA_ADDRESS,
  PLASINIA_INFORMATION,
  PLASINIA_TAX_REGULATIONS,
} from "../constants";
import { useBuyer } from "../store/buyer";
import { useInvoice } from "../store/invoice";
import { Buyer, DateFormat, DocumentType } from "../types";
import { formatDate, formatNumber, replaceStringChunk } from "../utility/utils";

const selectBuyer = (name: string, list: Buyer[]): Buyer => {
  const buyer = list.filter((list) => list.name === name);
  return buyer[0];
};

const PrintPage = () => {
  const { selectDraftedInvoice } = useInvoice();
  const { buyers } = useBuyer();
  const { pathname } = useLocation();

  const invoiceId = replaceStringChunk(pathname, "/print/");
  const selectedInvoice = selectDraftedInvoice(invoiceId);
  const selectedBuyer = selectBuyer(selectedInvoice?.buyerName, buyers);

  const formatBuyer = () => {
    if (!selectedBuyer.vatNumber)
      return `${selectedBuyer?.name} ${selectedBuyer.address} ${selectedBuyer.zipCode}, ${selectedBuyer.city}`;
    return `${selectedBuyer?.name} ${selectedBuyer.address} ${selectedBuyer.zipCode}, ${selectedBuyer.city}, OIB: ${selectedBuyer.vatNumber}`;
  };

  const calculateTotals = () => {
    if (!selectedInvoice) return;
    let total = 0;
    for (const i in selectedInvoice.items) {
      total += selectedInvoice.items[i].total;
    }
    selectedInvoice.summary.totalWithoutVat = +total.toFixed(2);
    return formatNumber(total);
  };

  const calculateBasePrice = (taxRate: number) => {
    if (!selectedInvoice) return;
    let total = 0;

    if (taxRate === 25) {
      total += selectedInvoice.summary.shipping;
    }
    for (const i in selectedInvoice.items) {
      if (selectedInvoice.items[i].vat === taxRate)
        total += selectedInvoice.items[i].total;
    }
    return formatNumber(total);
  };

  const calculateVat = (vat: number) => {
    if (!selectedInvoice) return;
    let total = 0;
    for (const i in selectedInvoice.items) {
      if (selectedInvoice.items[i].vat === vat)
        total += selectedInvoice.items[i].total;
    }
    let totalVat = 0;
    if (vat === 25) {
      totalVat = (total + selectedInvoice.summary.shipping) * 0.25;
    }

    if (vat === 13) {
      totalVat = total * 0.13;
    }
    selectedInvoice.summary.totalVat = totalVat;
    return totalVat;
  };

  const calculateTotalWithVAT = () => {
    const result =
      selectedInvoice.summary.totalWithoutVat +
      calculateVat(13)! +
      calculateVat(25)!;
    selectedInvoice.summary.totalWithVAT = result;
    return result;
  };

  useEffect(() => {
    console.log(selectedInvoice);
  }, [selectedInvoice]);

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
              <Header className='purple' as='h2'>
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
                RAČUN IZDAT U:{" "}
                {formatDate(selectedInvoice.invoiceIssuedAt, DateFormat.HH_mm)}
              </p>
            </Grid.Column>
          </Grid.Row>

          {/* ITEM LIST */}

          <Grid.Row>
            <Grid.Column floated='left' width={16}>
              <Table striped stackable compact size='small' definition>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell singleLine>#</Table.HeaderCell>
                    <Table.HeaderCell singleLine>
                      Naziv proizvoda
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine>Količina</Table.HeaderCell>
                    <Table.HeaderCell singleLine>PDV</Table.HeaderCell>
                    <Table.HeaderCell singleLine>Cijena</Table.HeaderCell>
                    <Table.HeaderCell singleLine>Popust</Table.HeaderCell>
                    <Table.HeaderCell singleLine>
                      Cijena s popustom
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine>Ukupno</Table.HeaderCell>
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
                        <Table.Cell>
                          {formatNumber(item.retailPrice)} kn
                        </Table.Cell>
                        <Table.Cell>{item.discount}%</Table.Cell>
                        <Table.Cell>
                          {formatNumber(item.discountedPrice)} kn
                        </Table.Cell>
                        <Table.Cell>{formatNumber(item.total)} kn</Table.Cell>
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

              {/* Razrada PDV-a po stopama */}

              <Table celled fixed compact size='small'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell textAlign='center' colSpan='3'>
                      Razrada PDV-a po stopama:
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell textAlign='center' content='OSNOVICA' />
                    <Table.HeaderCell textAlign='center' content='STOPA' />
                    <Table.HeaderCell textAlign='center' content='PDV' />
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell textAlign='center'>
                      {calculateBasePrice(13)} kn
                    </Table.Cell>
                    <Table.Cell textAlign='center'>13%</Table.Cell>
                    <Table.Cell textAlign='center'>
                      {formatNumber(calculateVat(13)!)} kn
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell textAlign='center'>
                      {calculateBasePrice(25)} kn
                    </Table.Cell>
                    <Table.Cell textAlign='center'>25%</Table.Cell>
                    <Table.Cell textAlign='center'>
                      {formatNumber(calculateVat(25)!)} kn
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>

            <Grid.Column width={6}>
              <p className='small-text'>
                DOSTAVA: {formatNumber(selectedInvoice.summary.shipping)}
              </p>
              <p className='small-text'>UKUPNO: {calculateTotals()} kn</p>
              <p className='small-text'>
                PDV: {formatNumber(calculateVat(25)! + calculateVat(13)!)} kn
              </p>
              <p className='small-text'>
                UKUPNO S PDV-om: {formatNumber(calculateTotalWithVAT())} kn
              </p>
              <div className='big-totals purple'>
                <p>{formatNumber(calculateTotalWithVAT())} kn</p>
                <p>{formatNumber(calculateTotalWithVAT() / 7.5)} €</p>
              </div>
            </Grid.Column>
          </Grid.Row>

          {/* FOOTER */}
          <Grid.Row>
            <Grid.Column width={10}>
              <p className='small-text purple'>ZA PLAĆANJE</p>
              <p className='small-text'>
                {`Opis plaćanja: Račun ${selectedInvoice.invoiceNumberPrefix}/2/1 IBAN: HR9723400091110950153 Swift: PBZGHR2X`}
              </p>
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
