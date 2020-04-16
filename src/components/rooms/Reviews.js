/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Icon, Message } from 'semantic-ui-react';
import { AuthContext } from 'context/auth/authState';
import { Redirect } from 'react-router-dom';
import MapModal from 'components/modals/MapModal';
import ReviewModal from './modals/ReviewModal';

import axiosInstance from 'utils/axiosInstance';
import formatCurrency from 'utils/formatCurrency';
import * as opencage from 'opencage-api-client';

export default () => {
  const { auth } = useContext(AuthContext);

  const [openMapModal, setOpenMapModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [position, setPosition] = useState([]);
  const [submitChange, setSubmitChange] = useState(false);
  const [info, setInfo] = useState('');
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState([]);

  const fetchData = async () => {
    const response = await axiosInstance.get('/api/v1/bookings');
    const bookings = response.data;

    // remove duplicate room id
    const filteredBookings = bookings.filter(
      (booking) => booking.statusPayment === true
    );
    const roomIds = new Set(filteredBookings.map((booking) => booking.room.id));
    const distinctRoomIds = [...roomIds];

    const roomsData = [];
    for (const roomId of distinctRoomIds) {
      const response = await axiosInstance.get(`/api/v1/rooms/${roomId}`);
      roomsData.push(response.data);
    }
    setRooms(roomsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [submitChange]);

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

  const handleReviewModal = (roomId) => {
    setRoomId(roomId);
    setOpenReviewModal(true);
  };

  const handleSubmitReview = async (data) => {
    try {
      await axiosInstance.post('/api/v1/reviews', data);
      setInfo(
        'Thank you for taking time to review this room. Have a nice day :)'
      );
      setOpenReviewModal(false);
      setSubmitChange(!submitChange);
    } catch (err) {
      console.log(err);
    }
  };

  const renderContent = () => {
    return rooms.map((room) => {
      return (
        <Table.Row key={room.id}>
          <Table.Cell>{room.name}</Table.Cell>
          <Table.Cell>
            {room.location} <br />
            <div className="mt-05r">
              <Button
                icon
                labelPosition="left"
                onClick={() => {
                  handleShowLocation(room.location);
                }}
              >
                <Icon name="map marker alternate" />
                Show
              </Button>
            </div>
          </Table.Cell>
          <Table.Cell>
            {room.bedrooms}Bedrooms <br />
            {room.beds} Beds <br />
            {room.baths} Baths <br />
          </Table.Cell>
          <Table.Cell>{formatCurrency(room.price)}</Table.Cell>
          <Table.Cell>
            <Button positive onClick={() => handleReviewModal(room.id)}>
              Your Review
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  if (auth === false) return <Redirect to="/" />;

  if (!rooms) return null;

  return (
    <div>
      <MapModal
        open={openMapModal}
        setOpen={setOpenMapModal}
        position={position}
      />

      <ReviewModal
        open={openReviewModal}
        setOpen={setOpenReviewModal}
        id={roomId}
        action={handleSubmitReview}
      />

      <h1>Your Reviews</h1>
      {info ? <Message info>{info}</Message> : ''}

      <div className="mb-3r">
        {rooms.length ? (
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>Brief Description</Table.HeaderCell>
                <Table.HeaderCell>Price / Night</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
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
