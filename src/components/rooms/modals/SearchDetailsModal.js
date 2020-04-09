import React from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';

export default ({ open, setOpen }) => {
  return (
    <Modal size={'small'} open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Change search details</Modal.Header>
      <Modal.Content>
        <p>I would like to change my search details</p>
        <Form>
          <Form.Field>
            <Form.Input label="Location" placeholder="Location" />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Input fluid label="Check in" placeholder="Check in" />
            <Form.Input fluid label="Check out" placeholder="Check out" />
            <Form.Input fluid label="Guests" placeholder="Guests" />
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button positive>Save</Button>
      </Modal.Actions>
    </Modal>
  );
};
