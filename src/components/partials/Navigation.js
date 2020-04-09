import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import LoginModal from 'components/auth/LoginModal';

export default () => {
  const [activeItem, setActiveItem] = useState('home');

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <Menu borderless>
      <Menu.Item name="Medanhost" />
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
      />
      <Menu.Item
        name="rooms"
        active={activeItem === 'rooms'}
        onClick={handleItemClick}
      />
      <Menu.Menu position="right">
        <Menu.Item>
          <LoginModal />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
