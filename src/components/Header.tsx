import { Link } from "react-router-dom";
import { Button, Dropdown, Icon, Menu } from "semantic-ui-react";

const Header = () => (
  <>
    <Menu attached='top' stackable>
      <Menu.Item as={Link} to='/' name='pricerocity'>
        Pricerocity
      </Menu.Item>

      <Dropdown item icon='add' simple>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to='/forms/new_item'>
            Dodaj novu stavku
          </Dropdown.Item>
          <Dropdown.Item>
            <Icon name='dropdown' />
            <span className='text'>Novi Dokument</span>

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
        <div className='ui right aligned category search item'>
          <div className='ui transparent icon input'>
            <input
              className='prompt'
              type='text'
              placeholder='Search documents...'
            />
            <i className='search link icon' />
          </div>
          <div className='results' />
        </div>
      </Menu.Menu>

      <Menu.Item>
        <Button primary>Sign up</Button>
      </Menu.Item>

      <Menu.Item>
        <Button>Log-in</Button>
      </Menu.Item>
    </Menu>
  </>
);

export default Header;
