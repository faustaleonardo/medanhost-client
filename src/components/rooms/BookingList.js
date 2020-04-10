import React, { useState } from 'react';
import { Table, Button, Icon, Message } from 'semantic-ui-react';
import Pagination from 'components/partials/Pagination';
import MapContainerModal from './modals/MapContainerModal';
import ReviewModal from './modals/ReviewModal';
import WarningModal from 'components/partials/WarningModal';

export default () => {
  const [openMapContainer, setOpenMapContainer] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [openReview, setOpenReview] = useState(false);

  return (
    <div>
      <MapContainerModal
        open={openMapContainer}
        setOpen={setOpenMapContainer}
      />

      <WarningModal
        open={openWarningModal}
        setOpen={setOpenWarningModal}
        title={'Cancel Booking'}
      />

      <ReviewModal open={openReview} setOpen={setOpenReview} />

      <h1>Your bookings</h1>
      <div className="mb-3r">
        <Message info>
          <p>
            Thank you for your booking. Please pay your booking before 15 Apr
            20.
          </p>
        </Message>
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Booking Details</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>Waiting for payment</Table.Cell>
              <Table.Cell>
                17 Apr 20 to 20 Apr 20 <br />
                3 guests <br />
                CBD Ayola, Jalan Ustad Abdul Hamid No.32, Tanjungbalai <br />
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
              <Table.Cell>
                Rp 500.000 x 3 nights = <br />
                <span className="green">Rp 1.500.000</span>
              </Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <Button positive>Pay now</Button>
                  <Button.Or />
                  <Button negative onClick={() => setOpenWarningModal(true)}>
                    Cancel
                  </Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      <div className="mb-3r">
        <Message info>
          <p>
            Thank you for your booking. Please pay your booking before 15 Apr
            20.
          </p>
        </Message>
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Booking Details</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>Paid</Table.Cell>
              <Table.Cell>
                17 Apr 20 to 20 Apr 20 <br />
                3 guests <br />
                CBD Ayola, Jalan Ustad Abdul Hamid No.32, Tanjungbalai <br />
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
              <Table.Cell>
                Rp 500.000 x 3 nights =<br />
                <span className="green">Rp 1.500.000</span>
              </Table.Cell>
              <Table.Cell>
                <Button positive onClick={() => setOpenReview(true)}>
                  Review
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
