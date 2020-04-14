/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Icon, Message } from 'semantic-ui-react';
import ReviewModal from './modals/ReviewModal';
import WarningModal from 'components/partials/WarningModal';
import { BookingContext } from 'context/bookings/bookingState';
import axiosInstance from 'utils/axiosInstance';
import formatCurrency from 'utils/formatCurrency';
import formatDate from 'utils/formatDate';

export default () => {
  const { bookings, setBookings, updateBooking } = useContext(BookingContext);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [openReview, setOpenReview] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await axiosInstance.get('/api/v1/bookings');
      const data = response.data;
      console.log(data);

      setBookings(data);
    };
    fetchBookings();
  }, []);

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
                    <span>Cancelled</span>
                  ) : (
                    ''
                  )}
                </Table.Cell>
                <Table.Cell>
                  {booking.room.location} <br />
                  <div className="mt-05r">
                    <Button icon labelPosition="left" onClick={() => {}}>
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
                  <span color="green">{formatCurrency(booking.price)}</span>
                </Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button positive>Pay now</Button>
                    <Button.Or />
                    <Button negative onClick={() => setOpenWarningModal(true)}>
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
        title={'Cancel Booking'}
      />

      <ReviewModal open={openReview} setOpen={setOpenReview} />

      <h1>Your Bookings</h1>
      {renderContent()}
    </div>
  );
};
