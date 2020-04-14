import React, { useContext, useState } from 'react';
import { Modal, Button, Form, Message } from 'semantic-ui-react';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import { SearchContext } from 'context/searches/searchState';
import convertToMMDDYYYY from 'utils/convertToMMDDYYYY';

export default ({ open, setOpen }) => {
  const { search, setSearch } = useContext(SearchContext);

  const [location, setLocation] = useState(search.location);
  const [datesRange, setDatesRange] = useState(search.datesRange);
  const [guests, setGuests] = useState(search.guests);
  const [error, setError] = useState('');

  const handleDateChange = (event, { name, value }) => {
    setDatesRange(value);
  };

  const handleSave = () => {
    if (!location || !datesRange || !guests) {
      return setError('All fields must be filled!');
    }

    const checkInDate = convertToMMDDYYYY(datesRange.slice(0, 10));
    const endDate = convertToMMDDYYYY(datesRange.slice(13));

    const data = {
      location,
      guests,
      checkInDate,
      endDate,
      datesRange,
    };

    setSearch(data);
    setOpen(false);
  };

  return (
    <Modal size={'small'} open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Change search details</Modal.Header>
      <Modal.Content>
        {error ? <Message negative>{error}</Message> : ''}
        <p>I would like to change my search details</p>
        <Form>
          <Form.Field>
            <Form.Input
              label="Location"
              placeholder="Location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Booking</label>
              <DatesRangeInput
                name="datesRange"
                placeholder="From - To"
                value={datesRange}
                iconPosition="left"
                popupPosition="bottom left"
                animation="none"
                minDate={new Date()}
                onChange={handleDateChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                label="Guests"
                placeholder="Guests"
                value={guests}
                onChange={(event) => setGuests(event.target.value)}
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={handleSave}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
