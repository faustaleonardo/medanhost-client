import React, { useContext, Fragment } from 'react';
import { Menu } from 'semantic-ui-react';
import LoginModal from 'components/auth/LoginModal';
import { useHistory } from 'react-router-dom';
import { AuthContext } from 'context/auth/authState';

export default () => {
  const history = useHistory();
  const { auth } = useContext(AuthContext);

  const handleItemClick = (e, { name }) => {
    switch (name) {
      case 'medanhost':
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
      case 'upcoming bookings':
        history.push('/hosts/1/bookings');
        break;
      case 'revenue':
        history.push('/hosts/1/revenue');
        break;
      case 'manage users':
        history.push('/admin/users/manage');
        break;
      case 'manage rooms':
        history.push('/admin/rooms/manage');
        break;
      case 'manage bookings':
        history.push('/admin/bookings/manage');
        break;
      case 'manage reviews':
        history.push('/admin/reviews/manage');
        break;
      case 'transaction':
        history.push('/admin/transaction');
        break;
      default:
        break;
    }
  };

  const renderContent = () => {
    switch (auth) {
      case null:
        return;
      case false:
        break;
      default:
        // 1 === admin
        // 2 === guest
        // 3 === host
        if (auth.roleId === 1) {
          return (
            <Fragment>
              <Menu.Item name="manage users" onClick={handleItemClick} />
              <Menu.Item name="manage rooms" onClick={handleItemClick} />
              <Menu.Item name="manage bookings" onClick={handleItemClick} />
              <Menu.Item name="manage reviews" onClick={handleItemClick} />
              <Menu.Item name="transaction" onClick={handleItemClick} />
            </Fragment>
          );
        } else if (auth.roleId === 2) {
          return (
            <Fragment>
              <Menu.Item name="bookmarks" onClick={handleItemClick} />
              <Menu.Item name="bookings" onClick={handleItemClick} />
            </Fragment>
          );
        } else {
          return (
            <Fragment>
              <Menu.Item name="my rooms" onClick={handleItemClick} />
              <Menu.Item name="upcoming bookings" onClick={handleItemClick} />
              <Menu.Item name="revenue" onClick={handleItemClick} />
            </Fragment>
          );
        }
    }
  };

  return (
    <Menu borderless>
      <Menu.Item name="medanhost" onClick={handleItemClick} />
      <Menu.Item name="rooms" onClick={handleItemClick} />
      {/* guest */}
      {renderContent()}

      {/* host */}
      {/* <Menu.Item name="my rooms" onClick={handleItemClick} />
      <Menu.Item name="upcoming bookings" onClick={handleItemClick} />
      <Menu.Item name="revenue" onClick={handleItemClick} /> */}

      {/* admin */}
      <Menu.Menu position="right">
        <Menu.Item>
          <LoginModal />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
