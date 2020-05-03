/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import {
  Table,
  Button,
  Icon,
  Message,
  Divider,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import WarningModal from 'components/partials/WarningModal';
import { BookingContext } from 'context/bookings/bookingState';
import { AuthContext } from 'context/auth/authState';
import MapModal from 'components/modals/MapModal';
import { Redirect } from 'react-router-dom';

import StripeCheckout from 'react-stripe-checkout';
import axiosInstance from 'utils/axiosInstance';
import formatCurrency from 'utils/formatCurrency';
import formatDate from 'utils/formatDate';
import * as opencage from 'opencage-api-client';

export default () => {
  const { bookings, setBookings, updateBooking } = useContext(BookingContext);
  const { auth } = useContext(AuthContext);

  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [openMapModal, setOpenMapModal] = useState(false);
  const [position, setPosition] = useState([]);
  const [bookingId, setBookingId] = useState('');
  const [submitChange, setSubmitChange] = useState(false);
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    const response = await axiosInstance.get('/api/v1/bookings');
    const data = response.data;

    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [submitChange]);

  const handleShowLocation = async (location) => {
    const response = await opencage.geocode({
      key: 'b4b821a42e91471abec749ba0efdeb6f',
      q: location,
    });
    const { geometry } = response.results[0];
    const lat = geometry.lat;
    const lng = geometry.lng;

    setPosition([lat, lng]);
    setOpenMapModal(true);
  };

  const handleCancelModal = (bookingId) => {
    setBookingId(bookingId);
    setOpenWarningModal(true);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await axiosInstance.patch(
        `/api/v1/bookings/${bookingId}`,
        { active: false }
      );
      const data = response.data;

      updateBooking(data);
      setSubmitChange(!submitChange);
      setOpenWarningModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStripeToken = async (bookingId, token) => {
    setLoading(true);
    await axiosInstance.patch(`api/v1/bookings/${bookingId}/stripe`, {
      token: token.id,
    });
    setInfo(
      'Thank you for paying your booking. We would be much appricated if you give a review about your experience :)'
    );
    setLoading(false);
    setSubmitChange(!submitChange);
  };

  const renderContent = () => {
    return bookings.map((booking) => {
      return (
        <div className="mb-3r" key={booking.id}>
          {booking.statusPayment === false && booking.active === true ? (
            <Message info>
              <p>
                Thank you for your booking. Please pay your booking before{' '}
                {formatDate(booking.expiredDate)}
              </p>
            </Message>
          ) : (
            ''
          )}
          <Table fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>
                  <div className="text-center">Guests</div>
                </Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  {booking.statusPayment === false &&
                  booking.active === true ? (
                    <span>Waiting for payment</span>
                  ) : (
                    ''
                  )}
                  {booking.statusPayment === true &&
                  booking.active === false ? (
                    <span className="green">Paid</span>
                  ) : (
                    ''
                  )}
                  {booking.statusPayment === false &&
                  booking.active === false ? (
                    <span className="red">Cancelled</span>
                  ) : (
                    ''
                  )}
                </Table.Cell>
                <Table.Cell>{booking.room.name}</Table.Cell>
                <Table.Cell>
                  {booking.room.location} <br />
                  <div className="mt-05r">
                    <Button
                      icon
                      labelPosition="left"
                      onClick={() => {
                        handleShowLocation(booking.room.location);
                      }}
                    >
                      <Icon name="map marker alternate" />
                      Show
                    </Button>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="text-center">{booking.guests}</div>
                </Table.Cell>
                <Table.Cell>
                  Check in <br />
                  {formatDate(booking.checkInDate)} <br /> <br />
                  Check out <br />
                  {formatDate(booking.checkOutDate)}
                </Table.Cell>
                <Table.Cell>
                  <span className="green">{formatCurrency(booking.price)}</span>
                </Table.Cell>
                <Table.Cell>
                  {booking.statusPayment === false &&
                  booking.active === true ? (
                    <div className="text-center">
                      <StripeCheckout
                        name="Medanhost XYZ"
                        description="Book your dream room now :)"
                        amount={booking.price * 100}
                        currency="IDR"
                        stripeKey={'pk_test_WVtlJ9fZYSLf3lT3yytzUL3C00GUsjC9MT'}
                        email={auth.email}
                        token={(token) => handleStripeToken(booking.id, token)}
                      >
                        <Button positive>Pay now</Button>
                      </StripeCheckout>
                      <Divider horizontal>Or</Divider>
                      <Button
                        negative
                        onClick={() => handleCancelModal(booking.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    ''
                  )}
                  {(booking.statusPayment === false &&
                    booking.active === false) ||
                  (booking.statusPayment === true && booking.active === false)
                    ? '-'
                    : ''}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      );
    });
  };

  if (auth === false) return <Redirect to="/" />;

  if (auth === null) return null;

  return (
    <div>
      <Dimmer active={loading}>
        <Loader>Loading</Loader>
      </Dimmer>
      <WarningModal
        open={openWarningModal}
        setOpen={setOpenWarningModal}
        id={bookingId}
        action={handleCancelBooking}
        title={'Cancel Booking'}
      />
      <MapModal
        open={openMapModal}
        setOpen={setOpenMapModal}
        position={position}
      />

      <h1>Your Bookings</h1>
      {info ? <Message info>{info}</Message> : ''}
      {bookings.length ? renderContent() : <p>No record yet...</p>}
    </div>
  );
};
