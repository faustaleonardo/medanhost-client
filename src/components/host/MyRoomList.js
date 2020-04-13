/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from 'utils/axiosInstance';

import WarningModal from 'components/partials/WarningModal';
import { RoomContext } from 'context/rooms/roomState';
import MapModal from 'components/modals/MapModal';
import formatCurrency from 'utils/formatCurrency';

export default () => {
  const history = useHistory();
  const { rooms, setRooms, deleteRoom } = useContext(RoomContext);

  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [openMapModal, setOpenMapModal] = useState(false);
  const [position, setPosition] = useState([]);
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await axiosInstance.get('/api/v1/rooms');
      const data = response.data;

      setRooms(data);
    };

    fetchRooms();
  }, []);

  const handleDeleteModal = (roomId) => {
    setRoomId(roomId);
    setOpenWarningModal(true);
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      // delete pictures
      await axiosInstance.delete(`/api/v1/pictures/rooms/${roomId}`);

      // delete room
      await axiosInstance.delete(`/api/v1/rooms/${roomId}`);

      deleteRoom(roomId);
      setOpenWarningModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const renderContent = () => {
    return rooms.map((room) => {
      return (
        <Table.Row key={room.id}>
          <Table.Cell>
            <Link to={'rooms/' + room.id}>{room.name}</Link>
          </Table.Cell>
          <Table.Cell>{room.type.value}</Table.Cell>
          <Table.Cell>
            {room.location} <br />
            <div className="mt-05r">
              <Button
                icon
                labelPosition="left"
                onClick={() => {
                  setPosition([51.505, -0.09]);
                  setOpenMapModal(true);
                }}
              >
                <Icon name="map marker alternate" />
                Show Location
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
            <Button.Group>
              <Button>Update</Button>
              <Button.Or />
              <Button negative onClick={() => handleDeleteModal(room.id)}>
                Delete
              </Button>
            </Button.Group>
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  if (!rooms.length) return null;

  return (
    <div>
      <WarningModal
        open={openWarningModal}
        setOpen={setOpenWarningModal}
        id={roomId}
        action={handleDeleteRoom}
        title={'Delete Room'}
      />

      <MapModal
        open={openMapModal}
        setOpen={setOpenMapModal}
        position={position}
      />

      <h1>Your Rooms</h1>

      <div className="mb-1r">
        <Button positive onClick={() => history.push('/host/rooms/create')}>
          Create
        </Button>
      </div>
      <div className="mb-3r">
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Types Of Place</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Brief Description</Table.HeaderCell>
              <Table.HeaderCell>Price / Night</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{renderContent()}</Table.Body>
        </Table>
      </div>
    </div>
  );
};
