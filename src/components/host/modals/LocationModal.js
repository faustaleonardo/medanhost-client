import React, { useState } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import * as opencage from 'opencage-api-client';

export default ({ open, setOpen }) => {
  const [query, setQuery] = useState('');

  const searchLocation = async () => {
    try {
      const response = await opencage.geocode({
        key: process.env.REACT_APP_OPENCAGE_API_KEY,
        q: query,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal size={'small'} open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Choose your location</Modal.Header>
      <Modal.Content>
        <p>My location is at ...</p>
        {/* form */}
        <Form onSubmit={searchLocation}>
          <Form.Input
            fluid
            placeholder="Location"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Form>

        {/* result */}
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={() => setOpen(false)}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
