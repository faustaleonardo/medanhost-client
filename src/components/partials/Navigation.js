import React from 'react';
import { Menu } from 'semantic-ui-react';
import LoginModal from 'components/auth/LoginModal';
import { useHistory } from 'react-router-dom';

export default () => {
  const history = useHistory();

  const handleItemClick = (e, { name }) => {
    switch (name) {
      case 'home':
        history.push('/');
        break;
      case 'rooms':
        history.push('/rooms');
        break;
      case 'bookings':
        history.push('/bookings');
        break;
      case 'bookmarks':
        history.push('/rooms/bookmarks');
        break;
      case 'my rooms':
        history.push('/hosts/1/rooms');
        break;
      default:
        break;
    }
  };

  return (
    <Menu borderless>
      <Menu.Item name="Medanhost" />
      <Menu.Item name="home" onClick={handleItemClick} />
      {/* guest */}
      <Menu.Item name="rooms" onClick={handleItemClick} />
      <Menu.Item name="bookmarks" onClick={handleItemClick} />
      <Menu.Item name="bookings" onClick={handleItemClick} />

      {/* host */}
      <Menu.Item name="my rooms" onClick={handleItemClick} />
      <Menu.Menu position="right">
        <Menu.Item>
          <LoginModal />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
