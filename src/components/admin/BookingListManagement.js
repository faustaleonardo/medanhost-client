import React, { useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import Pagination from 'components/partials/Pagination';
import WarningModal from 'components/partials/WarningModal';

export default () => {
  const [openWarningModal, setOpenWarningModal] = useState(false);

  return (
    <div>
      <WarningModal
        open={openWarningModal}
        setOpen={setOpenWarningModal}
        title={'Delete Booking'}
      />

      <h1>Rooms</h1>
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

          <Table.Body>
            <Table.Row>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>
                <div className="text-center">3</div>
              </Table.Cell>
              <Table.Cell>
                <div className="text-center">5</div>
              </Table.Cell>
              <Table.Cell>17 Apr 20</Table.Cell>
              <Table.Cell>20 Apr 20</Table.Cell>
              <Table.Cell>
                <div className="text-center">4</div>
              </Table.Cell>
              <Table.Cell>
                Rp 520.000 x 3 nights = <br />
                Rp 1.560.000
              </Table.Cell>
              <Table.Cell>Waiting for payment</Table.Cell>
              <Table.Cell>15 Apr 20</Table.Cell>
              <Table.Cell>15 Apr 20</Table.Cell>
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
