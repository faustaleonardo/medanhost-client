/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { AuthContext } from 'context/auth/authState';
import { RoomProvider } from 'context/rooms/roomState';
import { UserProvider } from 'context/users/userState';
import { SearchProvider } from 'context/searches/searchState';
import { BookingProvider } from 'context/bookings/bookingState';
import axiosInstance from 'utils/axiosInstance';

import Navigation from 'components/partials/Navigation';
import SearchForm from 'components/rooms/SearchForm';
import LoginOtp from 'components/auth/LoginOtp';

// guest
import RoomList from 'components/rooms/RoomList';
import Bookmarks from 'components/rooms/Bookmarks';
import Reviews from 'components/rooms/Reviews';
import RoomDetails from 'components/rooms/RoomDetails';
import BookingList from 'components/rooms/BookingList';

// host
import MyRoomList from 'components/host/MyRoomList';
import MyRoomForm from 'components/host/MyRoomForm';
import UpcomingBookings from 'components/host/UpcomingBookings';
import Revenue from 'components/host/Revenue';

// admin
import Login from 'components/auth/admin/Login';
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

          {/* guest */}
          <SearchProvider>
            <RoomProvider>
              <Route exact path="/" component={SearchForm} />
              <Route exact path="/rooms" component={RoomList} />
              <Route exact path="/rooms/:id" component={RoomDetails} />
              <Route exact path="/bookmarks" component={Bookmarks} />
              <Route exact path="/reviews" component={Reviews} />
            </RoomProvider>
            <BookingProvider>
              <Route exact path="/bookings" component={BookingList} />
            </BookingProvider>
          </SearchProvider>

          <Route exact path="/login/otp/:roleId" component={LoginOtp} />
          {/* host */}
          <RoomProvider>
            <Route exact path="/host/rooms" component={MyRoomList} />

            <Route
              exact
              path="/host/rooms/create"
              render={(props) => (
                <MyRoomForm
                  {...props}
                  title="Create a Room"
                  buttonName="Create"
                />
              )}
            />
            <Route
              exact
              path="/host/rooms/:id/update"
              render={(props) => (
                <MyRoomForm
                  {...props}
                  title="Update the Room"
                  buttonName="Update"
                />
              )}
            />

            <Route exact path="/host/bookings" component={UpcomingBookings} />
            <Route exact path="/host/revenue" component={Revenue} />
          </RoomProvider>

          {/* admin */}
          <Route exact path="/admin/login" component={Login} />
          <UserProvider>
            <Route
              exact
              path="/admin/users/manage"
              component={ManageUserList}
            />
          </UserProvider>
          <RoomProvider>
            <Route
              exact
              path="/admin/rooms/manage"
              component={ManageRoomList}
            />
          </RoomProvider>
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
