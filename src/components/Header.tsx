import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Icon, Menu } from "semantic-ui-react";
import { useInvoice } from "../store/invoice";
import { DateFormat, InvoiceR1 } from "../types";
import { formatDate, removeInvoiceFromLocalStorage } from "../utility/utils";

const Header = () => {
  const { draftedInvoices } = useInvoice();

  const renderNotificationsForInvoices = (notifications: InvoiceR1[]) => {
    if (notifications.length === 0) return;
    return (
      <Dropdown.Menu>
        <Dropdown.Header content='Notifikacije' />
        <Dropdown.Divider />
        {notifications.map((i) => (
          <div key={i._id}>
            <Dropdown.Item
              as={Link}
              to={`/print/${i._id}`}
              text={`${i.buyerName} ${formatDate(
                i.date,
                DateFormat.MM_DD_YYYY
              )}`}
            />
            <Button
              key={i.buyer}
              onClick={() => removeInvoiceFromLocalStorage(i._id)}
              basic
            >
              Ukloni
            </Button>
          </div>
        ))}
      </Dropdown.Menu>
    );
  };

  return (
    <Menu size='massive' stackable fluid>
      <Menu.Item as={Link} to='/' name='pricerocity'>
        Pricerocity
      </Menu.Item>

      <Dropdown item icon='add' simple>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to='/forms/new_item'>
            Nova stavka
          </Dropdown.Item>
          <Dropdown.Item as={Link} to='/forms/new_buyer'>
            Novi kupac
          </Dropdown.Item>
          <Dropdown.Item>
            <Icon name='dropdown' />
            <span className='text'>Novi dokument</span>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/forms/invoice_r1'>
                Obrazac R-1
              </Dropdown.Item>
              <Dropdown.Item as={Link} to='/forms/delivery_note'>
                Otpremnica
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Menu.Menu position='right'>
        {draftedInvoices.length > 0 && (
          <Dropdown
            labeled
            text={draftedInvoices.length.toString()}
            icon='mail'
            item
          >
            {renderNotificationsForInvoices(draftedInvoices)}
          </Dropdown>
        )}

        <Dropdown item text='Prečice'>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to='/item'>
              Stavke
            </Dropdown.Item>
            <Dropdown.Item as={Link} to='/buyer'>
              Kupci
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item>
          <Button>Uloguj se</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
