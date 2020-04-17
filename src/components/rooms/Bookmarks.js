import React, { useState, useContext } from 'react';
import * as opencage from 'opencage-api-client';
import { Redirect } from 'react-router-dom';

import { Table, Icon, Button } from 'semantic-ui-react';
import WarningModal from 'components/partials/WarningModal';
import MapModal from 'components/modals/MapModal';
import { BookmarkContext } from 'context/bookmarks/bookmarkState';
import { AuthContext } from 'context/auth/authState';
import formatCurrency from 'utils/formatCurrency';
import axiosInstance from 'utils/axiosInstance';

export default () => {
  const { bookmarks, deleteBookmark } = useContext(BookmarkContext);
  const { auth } = useContext(AuthContext);

  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [openMapModal, setOpenMapModal] = useState(false);
  const [position, setPosition] = useState([]);
  const [roomId, setRoomId] = useState(null);

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

  const handleDeleteBookmark = async (id) => {
    try {
      await axiosInstance.delete(`/api/v1/users/bookmarks/rooms/${id}`);
      deleteBookmark(id);
    } catch (err) {
      console.log(err.response);
    }
    setOpenWarningModal(false);
  };

  const handleDeleteBookmarkModal = (id) => {
    setRoomId(id);
    setOpenWarningModal(true);
  };

  const renderContent = () => {
    return bookmarks.map((room) => {
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
            <Button negative onClick={() => handleDeleteBookmarkModal(room.id)}>
              Delete
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  if (auth === false) return <Redirect to="/" />;

  if (auth === null || !bookmarks) return null;
  return (
    <div>
      <MapModal
        open={openMapModal}
        setOpen={setOpenMapModal}
        position={position}
      />
      <WarningModal
        open={openWarningModal}
        setOpen={setOpenWarningModal}
        id={roomId}
        action={handleDeleteBookmark}
        title={'Delete From Bookmarks'}
      />

      <h1>Your Bookmarks</h1>

      {bookmarks ? (
        <div>
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
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
