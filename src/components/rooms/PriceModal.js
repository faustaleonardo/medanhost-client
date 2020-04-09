import React from 'react';
import { Modal, Button, Form, Input } from 'semantic-ui-react';

export default ({ open, setOpen }) => {
  return (
    <Modal size={'tiny'} open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Choose your budget</Modal.Header>
      <Modal.Content>
        <p>I would like to see the rooms with price between ... </p>
        <Form>
          <Form.Group inline>
            <Form.Field>
              <Input placeholder="Min price" />
            </Form.Field>
            <Form.Field>
              <Input placeholder="Max price" />
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button positive>Save</Button>
      </Modal.Actions>
    </Modal>
  );
};
