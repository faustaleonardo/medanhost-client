/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { AuthContext } from 'context/auth/authState';
import axiosInstance from 'utils/axiosInstance';

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
import MyRoomForm from 'components/host/MyRoomForm';
import UpcomingBookings from 'components/host/UpcomingBookings';
import Revenue from 'components/host/Revenue';

// admin
import ManageUserList from 'components/admin/ManageUserList';
import ManageRoomList from 'components/admin/ManageRoomList';
import ManageBookingList from 'components/admin/ManageBookingList';
import ManageReviewList from 'components/admin/ManageReviewList';
import Transaction from 'components/admin/Transaction';

export default () => {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const fetchAuth = async () => {
      const jwt = localStorage.getItem('jwt');
      if (!jwt) return setAuth(false);

      const response = await axiosInstance.get('api/v1/users/auth');
      if (response.status === 200) setAuth(response.data);
      else setAuth(false);
    };
    fetchAuth();
  }, []);

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
          <Route exact path="/hosts/1/rooms/1/create" component={MyRoomForm} />
          <Route exact path="/hosts/1/bookings" component={UpcomingBookings} />
          <Route exact path="/hosts/1/revenue" component={Revenue} />

          {/* admin */}
          <Route exact path="/admin/users/manage" component={ManageUserList} />
          <Route exact path="/admin/rooms/manage" component={ManageRoomList} />
          <Route
            exact
            path="/admin/bookings/manage"
            component={ManageBookingList}
          />
          <Route
            exact
            path="/admin/reviews/manage"
            component={ManageReviewList}
          />
          <Route exact path="/admin/transaction" component={Transaction} />
        </BrowserRouter>
      </Container>
    </div>
  );
};
