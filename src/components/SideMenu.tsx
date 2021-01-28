import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Dropdown, Icon, Input, Menu, MenuItemProps } from "semantic-ui-react";

const SideMenu = () => {
  const [activeItem, setActiveItem] = useState<string | undefined>("");
  const history = useHistory();

  const handleItemClick = (
    _: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    props: MenuItemProps
  ) => {
    const { name } = props;
    setActiveItem(name);
    history.push(`/${name}`);
  };

  return (
    <Menu size='large' vertical fixed='left'>
      <Menu.Item>
        <Input placeholder='Search...' />
      </Menu.Item>

      <Menu.Item>
        Prečice
        <Menu.Menu>
          <Menu.Item
            onClick={handleItemClick}
            active={activeItem === "item"}
            name='item'
          >
            Stavke
          </Menu.Item>
          <Menu.Item
            onClick={handleItemClick}
            active={activeItem === "buyers"}
            name='buyer'
          >
            Kupci
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item name='browse'>
        <Icon name='grid layout' />
        Browse
      </Menu.Item>
      <Menu.Item name='messages'>Messages</Menu.Item>

      <Dropdown item text='More'>
        <Dropdown.Menu>
          <Dropdown.Item icon='edit' text='Edit Profile' />
          <Dropdown.Item icon='globe' text='Choose Language' />
          <Dropdown.Item icon='settings' text='Account Settings' />
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
};

export default SideMenu;
