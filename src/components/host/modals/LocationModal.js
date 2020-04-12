import React from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';

export default ({ open, setOpen }) => {
  const searchLocation = () => {};

  return (
    <Modal size={'small'} open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Choose your location</Modal.Header>
      <Modal.Content>
        <p>My location is at ...</p>
        {/* form */}
        <Form onSubmit={searchLocation}>
          <Form.Input fluid placeholder="Location" />
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
