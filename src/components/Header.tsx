import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Icon, Label, Menu } from "semantic-ui-react";
import { useInvoice } from "../store/invoice";

const Header = () => {
  const { selectedInvoices } = useInvoice();
  return (
    <Menu size='massive' attached='top' stackable fluid>
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
        {selectedInvoices.length > 0 && (
          <Menu.Item name='pricerocity'>
            <Label color='teal'>{selectedInvoices.length}</Label>
          </Menu.Item>
        )}
        <Menu.Item>
          <Button>Uloguj se</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
