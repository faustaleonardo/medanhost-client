/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Table, Button } from 'semantic-ui-react';
import WarningModal from 'components/partials/WarningModal';
import { BookingContext } from 'context/bookings/bookingState';
import { Redirect } from 'react-router-dom';
import { AuthContext } from 'context/auth/authState';

import axiosInstance from 'utils/axiosInstance';
import formatCurrency from 'utils/formatCurrency';
import formatDate from 'utils/formatDate';

export default () => {
  const { bookings, setBookings, updateBooking } = useContext(BookingContext);
  const { auth } = useContext(AuthContext);

  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [submitChange, setSubmitChange] = useState(false);

  const fetchRooms = async () => {
    const response = await axiosInstance.get('/api/v1/bookings/all');
    const data = response.data;

    setBookings(data);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [submitChange]);

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

  const renderContent = () => {
    return bookings.map((booking) => {
      return (
        <Table.Row key={booking.id}>
          <Table.Cell>{booking.id}</Table.Cell>
          <Table.Cell>
            <div className="text-center">{booking.user.id}</div>
          </Table.Cell>
          <Table.Cell>
            <div className="text-center">{booking.room.id}</div>
          </Table.Cell>
          <Table.Cell>{formatDate(booking.checkInDate)}</Table.Cell>
          <Table.Cell>{formatDate(booking.checkOutDate)}</Table.Cell>
          <Table.Cell>
            <div className="text-center">{booking.guests}</div>
          </Table.Cell>
          <Table.Cell>
            <span className="green">{formatCurrency(booking.price)}</span>
          </Table.Cell>
          <Table.Cell>
            {booking.statusPayment === false && booking.active === true ? (
              <span>Waiting for payment</span>
            ) : (
              ''
            )}
            {booking.statusPayment === true && booking.active === false ? (
              <span className="green">Paid</span>
            ) : (
              ''
            )}
            {booking.statusPayment === false && booking.active === false ? (
              <span className="red">Cancelled</span>
            ) : (
              ''
            )}
          </Table.Cell>
          <Table.Cell>{formatDate(booking.createdAt)}</Table.Cell>
          <Table.Cell>{formatDate(booking.updatedAt)}</Table.Cell>
          <Table.Cell>
            {booking.statusPayment === false && booking.active === true ? (
              <Button negative onClick={() => handleCancelModal(booking.id)}>
                Cancel
              </Button>
            ) : (
              ''
            )}
            {(booking.statusPayment === false && booking.active === false) ||
            (booking.statusPayment === true && booking.active === false)
              ? '-'
              : ''}
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  if (!auth) return <Redirect to="/" />;
  if (!bookings.length) return null;

  return (
    <div>
      <WarningModal
        open={openWarningModal}
        setOpen={setOpenWarningModal}
        id={bookingId}
        action={handleCancelBooking}
        title={'Delete Booking'}
      />

      <h1>Bookings</h1>
      <div className="mb-3r">
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>
                <div className="text-center">Guest ID</div>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <div className="text-center">Room ID</div>
              </Table.HeaderCell>
              <Table.HeaderCell>Check in</Table.HeaderCell>
              <Table.HeaderCell>Check out</Table.HeaderCell>
              <Table.HeaderCell>
                <div className="text-center">Guests</div>
              </Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Expired Date</Table.HeaderCell>
              <Table.HeaderCell>Created At</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{renderContent()}</Table.Body>
        </Table>
      </div>
    </div>
  );
};
