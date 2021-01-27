import { Link } from "react-router-dom";
import { Button, Container, Dropdown, Icon, Menu } from "semantic-ui-react";

const Header = () => (
  <Container>
    <Menu attached='top' stackable fluid>
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
        <Menu.Item>
          <Button>Uloguj se</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  </Container>
);

export default Header;
