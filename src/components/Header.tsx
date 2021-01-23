import React from "react";
import { Dropdown, Icon, Menu, Segment } from "semantic-ui-react";

const Header = () => (
  <>
    <Menu inverted attached='top'>
      <Dropdown item icon='wrench' simple>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Icon name='dropdown' />
            <span className='text'>New</span>

            <Dropdown.Menu>
              <Dropdown.Item>Document</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>Open</Dropdown.Item>
          <Dropdown.Item>Save...</Dropdown.Item>
          <Dropdown.Item>Edit Permissions</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header>Export</Dropdown.Header>
          <Dropdown.Item>Share</Dropdown.Item>
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
    </Menu>
  </>
);

export default Header;
