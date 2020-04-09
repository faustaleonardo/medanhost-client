import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import LoginModal from 'components/auth/LoginModal';
import { useHistory } from 'react-router-dom';

export default () => {
  const [activeItem, setActiveItem] = useState('home');
  const history = useHistory();

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);

    switch (name) {
      case 'home':
        history.push('/');
        break;
      case 'rooms':
        history.push('/rooms');
        break;
      default:
        break;
    }
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
