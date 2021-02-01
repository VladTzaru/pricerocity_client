import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu, MenuItemProps } from "semantic-ui-react";

const SideMenu = () => {
  const [activeItem, setActiveItem] = useState<string | undefined>("");

  const handleItemClick = (
    _: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    props: MenuItemProps
  ) => {
    const { name } = props;
    setActiveItem(name);
  };

  return (
    <Menu size='large' vertical fixed='left'>
      <Menu.Item>
        Dodaj
        <Menu.Menu>
          <Menu.Item
            as={Link}
            to='/forms/new_item'
            onClick={handleItemClick}
            active={activeItem === "item"}
            name='item'
          >
            Stavku
          </Menu.Item>
          <Menu.Item
            as={Link}
            to='/forms/new_buyer'
            onClick={handleItemClick}
            active={activeItem === "buyers"}
            name='buyer'
          >
            Kupca
          </Menu.Item>
          <Menu.Item
            as={Link}
            to='/forms/invoice_r1'
            onClick={handleItemClick}
            active={activeItem === "invoice_r1"}
            name='invoice_r1'
          >
            R1 račun
          </Menu.Item>
          <Menu.Item
            as={Link}
            to='/forms/delivery_note'
            onClick={handleItemClick}
            active={activeItem === "delivery_note"}
            name='delivery_note'
          >
            Otpremnicu
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>

      <Dropdown item text='Opcije'>
        <Dropdown.Menu>
          <Dropdown.Item icon='ordered list' text='Dodaj stavku u dokument' />
          <Dropdown.Item icon='globe' text='Izaberi jezik' />
          <Dropdown.Item icon='money' text='Uračunaj PDV' />
          <Dropdown.Item icon='euro' text='Prikaži EUR' />
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
};

export default SideMenu;
