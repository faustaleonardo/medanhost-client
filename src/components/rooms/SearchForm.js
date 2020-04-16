import React, { useState, useContext } from 'react';
import {
  Form,
  Button,
  Message,
  Segment,
  Header,
  Icon,
} from 'semantic-ui-react';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import { SearchContext } from 'context/searches/searchState';
import { AuthContext } from 'context/auth/authState';
import { useHistory } from 'react-router-dom';
import convertToMMDDYYYY from 'utils/convertToMMDDYYYY';

export default () => {
  const { setSearch } = useContext(SearchContext);
  const { auth } = useContext(AuthContext);

  const [location, setLocation] = useState('');
  const [datesRange, setDatesRange] = useState('');
  const [guests, setGuests] = useState(0);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = () => {
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
    history.push('/rooms');
  };

  const handleDateChange = (event, { name, value }) => {
    setDatesRange(value);
  };

  return (
    <div className="general-form center-vh">
      {auth === false || (auth && auth.role.id !== 2) ? (
        <Segment placeholder>
          <Header icon>
            <Icon name="home " />
            Welcome to MEDANHOST
          </Header>
          <h3 className="text-center">
            Here you will find the cheapest and the most comfortable room!
          </h3>
        </Segment>
      ) : (
        <Form>
          <h1>Find your room</h1>
          {error ? <Message negative>{error}</Message> : ''}

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
                label="Guests"
                placeholder="Guests"
                value={guests}
                onChange={(event) => setGuests(event.target.value)}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field control={Button} positive onClick={handleSubmit}>
            Search
          </Form.Field>
        </Form>
      )}
    </div>
  );
};
