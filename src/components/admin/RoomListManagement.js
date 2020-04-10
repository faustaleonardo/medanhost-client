import React, { useState } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import Pagination from 'components/partials/Pagination';
import WarningModal from 'components/partials/WarningModal';
import MapContainerModal from 'components/rooms/modals/MapContainerModal';

export default () => {
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [openMapContainer, setOpenMapContainer] = useState(false);

  return (
    <div>
      <WarningModal
        open={openWarningModal}
        setOpen={setOpenWarningModal}
        title={'Delete Room'}
      />
      <MapContainerModal
        open={openMapContainer}
        setOpen={setOpenMapContainer}
      />

      <h1>Rooms</h1>
      <div className="mb-3r">
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Type of Place</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Brief Description</Table.HeaderCell>
              <Table.HeaderCell>
                <div className="text-center">Host ID</div>
              </Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>CBD Ayola</Table.Cell>
              <Table.Cell>Shared Room</Table.Cell>
              <Table.Cell>
                Jalan Ustad Abdul Hamid No.32, Tanjungbalai
                <div className="mt-05r">
                  <Button
                    icon
                    labelPosition="left"
                    onClick={() => setOpenMapContainer(true)}
                  >
                    <Icon name="map marker alternate" />
                    Show Location
                  </Button>
                </div>
              </Table.Cell>
              <Table.Cell>4 guests · 2 bedrooms · 2 beds · 2 baths</Table.Cell>
              <Table.Cell>
                <div className="text-center">4</div>
              </Table.Cell>
              <Table.Cell>
                <Button
                  negative
                  onClick={() => {
                    setOpenWarningModal(true);
                  }}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      <Pagination />
    </div>
  );
};
