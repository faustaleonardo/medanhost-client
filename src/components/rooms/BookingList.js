import React from 'react';
import { Table, Button } from 'semantic-ui-react';

export default () => {
  return (
    <div>
      <h1>Your bookings</h1>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Check in</Table.HeaderCell>
            <Table.HeaderCell>Check out</Table.HeaderCell>
            <Table.HeaderCell>Location</Table.HeaderCell>
            <Table.HeaderCell>
              <div className="text-center">Guests</div>
            </Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Waiting for payment</Table.Cell>
            <Table.Cell>23 Apr 2020</Table.Cell>
            <Table.Cell>27 Apr 2020</Table.Cell>
            <Table.Cell>Jalan Ustad Abdul Hamid No.32, Tanjungbalai</Table.Cell>
            <Table.Cell>
              <div className="text-center">3</div>
            </Table.Cell>
            <Table.Cell>Rp 1.500.000</Table.Cell>
            <Table.Cell>
              <Button.Group>
                <Button positive>Pay now</Button>
                <Button.Or />
                <Button negative>Cancel</Button>
              </Button.Group>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>Waiting for payment</Table.Cell>
            <Table.Cell>23 Apr 2020</Table.Cell>
            <Table.Cell>27 Apr 2020</Table.Cell>
            <Table.Cell>Jalan Ustad Abdul Hamid No.32, Tanjungbalai</Table.Cell>
            <Table.Cell>
              <div className="text-center">3</div>
            </Table.Cell>
            <Table.Cell>Rp 1.500.000</Table.Cell>
            <Table.Cell>
              <Button.Group>
                <Button positive>Pay now</Button>
                <Button.Or />
                <Button negative>Cancel</Button>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};
