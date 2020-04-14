/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Icon, Message } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import ReviewModal from './modals/ReviewModal';
import WarningModal from 'components/partials/WarningModal';
import { BookingContext } from 'context/bookings/bookingState';
import MapModal from 'components/modals/MapModal';

import axiosInstance from 'utils/axiosInstance';
import formatCurrency from 'utils/formatCurrency';
import formatDate from 'utils/formatDate';
import * as opencage from 'opencage-api-client';

export default () => {
  const history = useHistory();

  const { bookings, setBookings, updateBooking } = useContext(BookingContext);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [openMapModal, setOpenMapModal] = useState(false);
  const [position, setPosition] = useState([]);
  const [bookingId, setBookingId] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await axiosInstance.get('/api/v1/bookings');
      const data = response.data;

      setBookings(data);
    };
    fetchBookings();
  }, []);

  const handleShowLocation = async (location) => {
    const response = await opencage.geocode({
      key: process.env.REACT_APP_OPENCAGE_API_KEY,
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
      history.push('/bookings');
      setOpenWarningModal(false);
    } catch (err) {
      console.log(err);
    }
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
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>
                  <div className="text-center">Guest</div>
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
                    <span>Paid</span>
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
                      Show Location
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
                  <Button.Group>
                    <Button positive>Pay now</Button>
                    <Button.Or />
                    <Button
                      negative
                      onClick={() => handleCancelModal(booking.id)}
                    >
                      Cancel
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      );
    });
  };

  if (!bookings) return null;

  return (
    <div>
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

      <ReviewModal open={openReview} setOpen={setOpenReview} />

      <h1>Your Bookings</h1>
      {renderContent()}
    </div>
  );
};
