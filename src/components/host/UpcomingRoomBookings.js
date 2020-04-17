/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from 'context/auth/authState';
import MapModal from 'components/modals/MapModal';

import axiosInstance from 'utils/axiosInstance';
import formatCurrency from 'utils/formatCurrency';
import formatDate from 'utils/formatDate';
import * as opencage from 'opencage-api-client';

export default () => {
  const { auth } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [openMapModal, setOpenMapModal] = useState(false);
  const [position, setPosition] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const bookingsData = [];

      const response = await axiosInstance.get(
        `/api/v1/rooms/hosts/${auth.id}/bookings`
      );
      const rooms = response.data;

      for (const room of rooms) {
        for (const booking of room.bookings) {
          const data = {
            ...booking,
            name: room.name,
            location: room.location,
            type: room.type.value,
          };
          bookingsData.push(data);
        }
      }

      setBookings(bookingsData);
    };
    if (auth) fetchData();
  }, [auth]);

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

  const renderContent = () => {
    return bookings.map((booking) => {
      return (
        <Table.Row key={booking.id}>
          <Table.Cell>{booking.name}</Table.Cell>
          <Table.Cell>{booking.type}</Table.Cell>
          <Table.Cell>
            {booking.location}
            <br />
            <div className="mt-05r">
              <Button
                icon
                labelPosition="left"
                onClick={() => handleShowLocation(booking.location)}
              >
                <Icon name="map marker alternate" />
                Show
              </Button>
            </div>
          </Table.Cell>
          <Table.Cell>{formatDate(booking.checkInDate)}</Table.Cell>
          <Table.Cell>{formatDate(booking.checkOutDate)}</Table.Cell>
          <Table.Cell>
            <div className="text-center">{booking.guests}</div>
          </Table.Cell>
          <Table.Cell>
            <span className="green">{formatCurrency(booking.price)}</span>
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  if (auth === false) return <Redirect to="/" />;

  return (
    <div>
      <MapModal
        open={openMapModal}
        setOpen={setOpenMapModal}
        position={position}
      />
      <h1>Upcoming Bookings</h1>
      <div className="mt-1r mb-3r">
        {bookings.length ? (
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Type Of Place</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>Check in</Table.HeaderCell>
                <Table.HeaderCell>Check out</Table.HeaderCell>
                <Table.HeaderCell>
                  <div className="text-center">Guests</div>
                </Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{renderContent()}</Table.Body>
          </Table>
        ) : (
          <p>No record yet...</p>
        )}
      </div>
    </div>
  );
};
