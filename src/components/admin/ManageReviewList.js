import React, { useState } from 'react';
import { Table, Button, Rating } from 'semantic-ui-react';
import Pagination from 'components/partials/Pagination';
import WarningModal from 'components/partials/WarningModal';

export default () => {
  const [openWarningModal, setOpenWarningModal] = useState(false);

  return (
    <div>
      <WarningModal
        open={openWarningModal}
        setOpen={setOpenWarningModal}
        title={'Delete Review'}
      />

      <h1>Reviews</h1>
      <div className="mb-3r">
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell singleLine>
                <div className="text-center">Guest ID</div>
              </Table.HeaderCell>
              <Table.HeaderCell singleLine>
                <div className="text-center">Room ID</div>
              </Table.HeaderCell>
              <Table.HeaderCell>Ratings</Table.HeaderCell>
              <Table.HeaderCell>Comments</Table.HeaderCell>
              <Table.HeaderCell singleLine>
                <div className="text-center">Created At</div>
              </Table.HeaderCell>
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
              <Table.Cell>
                <Rating icon="star" defaultRating={3} maxRating={5} disabled />
              </Table.Cell>
              <Table.Cell>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Table.Cell>
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
