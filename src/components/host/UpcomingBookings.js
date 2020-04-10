import React, { useState } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Pagination from 'components/partials/Pagination';
import WarningModal from 'components/partials/WarningModal';

export default () => {
  const [openWarningModal, setOpenWarningModal] = useState(false);

  return (
    <div>
      <WarningModal
        open={openWarningModal}
        setOpen={setOpenWarningModal}
        title={'Delete Room'}
      />

      <h1>Upcoming Bookings</h1>
      <div className="mt-1r mb-3r">
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Types Of Place</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Check in</Table.HeaderCell>
              <Table.HeaderCell>Check out</Table.HeaderCell>
              <Table.HeaderCell>
                <div className="text-center">Guests</div>
              </Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Link to="/rooms/1">CBD Ayola</Link>
              </Table.Cell>
              <Table.Cell>Shared Room</Table.Cell>
              <Table.Cell>
                Jalan Ustad Abdul Hamid No.32, Tanjungbalai <br />
                <div className="mt-05r">
                  <Button icon labelPosition="left">
                    <Icon name="map marker alternate" />
                    Show Location
                  </Button>
                </div>
              </Table.Cell>
              <Table.Cell>17 Apr 20</Table.Cell>
              <Table.Cell>20 Apr 20</Table.Cell>
              <Table.Cell>
                <div className="text-center">3</div>
              </Table.Cell>
              <Table.Cell>
                Rp 520.000 x 3 nights =<br />
                Rp 1.500.000
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      <Pagination />
    </div>
  );
};
