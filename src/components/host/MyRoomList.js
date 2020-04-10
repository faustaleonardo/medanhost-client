import React, { useState } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';

import Pagination from 'components/partials/Pagination';
import WarningModal from 'components/partials/WarningModal';

export default () => {
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const history = useHistory();

  return (
    <div>
      <WarningModal
        open={openWarningModal}
        setOpen={setOpenWarningModal}
        title={'Delete Room'}
      />

      <h1>Your Rooms</h1>

      <div className="mb-1r">
        <Button
          positive
          onClick={() => history.push('/hosts/1/rooms/1/create')}
        >
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
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
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
              <Table.Cell>
                1 Bedroom <br />
                2 Beds <br />
                2 Baths <br />
              </Table.Cell>
              <Table.Cell>
                1 guest / night = Rp 500.000 <br />
                2 guests / night = Rp 510.000 <br />
                3 guests / night = Rp 520.000 <br />
                4 guests / night = Rp 530.000 <br />
              </Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <Button>Update</Button>
                  <Button.Or />
                  <Button negative onClick={() => setOpenWarningModal(true)}>
                    Delete
                  </Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Types Of Place</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Brief Description</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
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
              <Table.Cell>
                1 Bedroom <br />
                2 Beds <br />
                2 Baths <br />
              </Table.Cell>
              <Table.Cell>
                1 guest / night = Rp 500.000 <br />
                2 guests / night = Rp 510.000 <br />
                3 guests / night = Rp 520.000 <br />
                4 guests / night = Rp 530.000 <br />
              </Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <Button>Update</Button>
                  <Button.Or />
                  <Button negative onClick={() => setOpenWarningModal(true)}>
                    Delete
                  </Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      <Pagination />
    </div>
  );
};
