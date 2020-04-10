import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Navigation from 'components/partials/Navigation';
import SearchForm from 'components/rooms/SearchForm';
import LoginOtp from 'components/auth/LoginOtp';

// guest
import RoomList from 'components/rooms/RoomList';
import Bookmarks from 'components/rooms/Bookmarks';
import RoomDetails from 'components/rooms/RoomDetails';
import BookingList from 'components/rooms/BookingList';

// host
import MyRoomList from 'components/host/MyRoomList';

export default () => {
  return (
    <div className="py-1r">
      <Container>
        <BrowserRouter>
          <Navigation />
          <Route exact path="/" component={SearchForm} />
          <Route exact path="/login/otp" component={LoginOtp} />

          {/* guest */}
          <Route exact path="/rooms" component={RoomList} />
          <Route exact path="/rooms/1" component={RoomDetails} />
          <Route exact path="/rooms/bookmarks" component={Bookmarks} />
          <Route exact path="/bookings" component={BookingList} />

          {/* host */}
          <Route exact path="/hosts/1/rooms" component={MyRoomList} />
        </BrowserRouter>
      </Container>
    </div>
  );
};
