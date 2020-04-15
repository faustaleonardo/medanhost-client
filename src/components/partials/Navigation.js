import React, { useContext, Fragment } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import LoginModal from 'components/auth/LoginModal';
import { useHistory } from 'react-router-dom';
import { AuthContext } from 'context/auth/authState';

export default () => {
  const history = useHistory();
  const { setAuth, auth } = useContext(AuthContext);

  const handleItemClick = (e, { name }) => {
    switch (name) {
      case 'medanhost':
        history.push('/');
        break;
      case 'bookings':
        history.push('/bookings');
        break;
      case 'reviews':
        history.push('/reviews');
        break;
      case 'bookmarks':
        history.push('/rooms/bookmarks');
        break;
      case 'my rooms':
        history.push('/host/rooms');
        break;
      case 'upcoming bookings':
        history.push('/host/bookings');
        break;
      case 'revenue':
        history.push('/host/revenue');
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

  const logout = () => {
    localStorage.removeItem('jwt');
    history.push('/');
    setAuth(false);
  };

  const renderContent = () => {
    switch (auth) {
      case null:
        return;
      case false:
        return;
      default:
        if (auth.role.value === 'admin') {
          return (
            <Fragment>
              <Menu.Item name="manage users" onClick={handleItemClick} />
              <Menu.Item name="manage rooms" onClick={handleItemClick} />
              <Menu.Item name="manage bookings" onClick={handleItemClick} />
              <Menu.Item name="manage reviews" onClick={handleItemClick} />
              <Menu.Item name="transaction" onClick={handleItemClick} />
            </Fragment>
          );
        } else if (auth.role.value === 'guest') {
          return (
            <Fragment>
              <Menu.Item name="bookmarks" onClick={handleItemClick} />
              <Menu.Item name="bookings" onClick={handleItemClick} />
              <Menu.Item name="reviews" onClick={handleItemClick} />
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

  if (auth === null) return null;

  return (
    <Menu borderless>
      <Menu.Item name="medanhost" onClick={handleItemClick} />
      {renderContent()}

      <Menu.Menu position="right">
        <Menu.Item>
          {!auth ? <LoginModal /> : <Button onClick={logout}>Logout</Button>}
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
