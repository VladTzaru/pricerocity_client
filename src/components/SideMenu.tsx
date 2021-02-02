import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu, MenuItemProps } from "semantic-ui-react";
import ItemSelection from "./documents/ItemSelection";

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
    <Menu size='massive' vertical fixed='left'>
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

      {/* ADD ITEMS TO INVOICE */}
      <Menu.Item>
        <ItemSelection />
      </Menu.Item>

      <Dropdown item text='Opcije'>
        <Dropdown.Menu>
          <Dropdown.Item icon='globe' text='Prevedi na ENG' />
          <Dropdown.Item icon='money' text='Uračunaj PDV' />
          <Dropdown.Item icon='euro' text='Prikaži EUR' />
        </Dropdown.Menu>
      </Dropdown>

      {/* PRINT */}
      <Menu.Item onClick={() => window.print()}>Printaj</Menu.Item>
    </Menu>
  );
};

export default SideMenu;
