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
        title={'Delete User'}
      />

      <h1>Users</h1>
      <div className="mb-3r">
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Google ID</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>1120192300129</Table.Cell>
              <Table.Cell>johndoe@gmail.com</Table.Cell>
              <Table.Cell>John</Table.Cell>
              <Table.Cell>Doe</Table.Cell>
              <Table.Cell>Guest</Table.Cell>
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
