import React, { useState } from 'react';
import { Modal, Form, List, Button, Loader, Dimmer } from 'semantic-ui-react';
import * as opencage from 'opencage-api-client';

export default ({ open, setOpen, location, setLocation }) => {
  const [query, setQuery] = useState('');
  const [locationOptions, setLocationOptions] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const searchLocation = async () => {
    try {
      setLoadingLocation(true);
      const response = await opencage.geocode({
        key: 'b4b821a42e91471abec749ba0efdeb6f',
        q: query,
      });
      setLoadingLocation(false);
      const results = response.results;
      const data = results.map((result, index) => ({
        key: index,
        value: result.formatted,
      }));

      setQuery('');
      setLocationOptions(data);
    } catch (err) {
      setQuery('');
      console.log(err);
    }
  };

  const renderContent = () => {
    return locationOptions.map((locationOption) => {
      return (
        <List.Item key={locationOption.key}>
          <List.Content>
            <div
              className="py-05r locationOption"
              onClick={() => setLocation(locationOption.value)}
            >
              {locationOption.value}
            </div>
          </List.Content>
        </List.Item>
      );
    });
  };

  const handleCloseModal = () => {
    setLocationOptions([]);
    setOpen(false);
  };

  return (
    <Modal size={'small'} open={open} onClose={handleCloseModal}>
      <Modal.Header>Choose your location</Modal.Header>
      <Modal.Content>
        <p>My location is at {location}</p>
        {/* form */}
        <Form onSubmit={searchLocation}>
          <Form.Input
            fluid
            placeholder="Location or Coordinates"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Form>

        {/* results */}
        <p className="mt-1r">Results: {locationOptions.length}</p>
        <List celled>{renderContent()}</List>

        <Dimmer active={loadingLocation}>
          <Loader>Loading</Loader>
        </Dimmer>
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={handleCloseModal}>
          Done
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
