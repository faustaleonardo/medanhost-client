import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

export default ({ open, setOpen, title, id, action }) => {
  return (
    <Modal size={'mini'} open={open} onClose={() => setOpen(false)}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <p>I am certainly sure to do this.</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative content="Confirm" onClick={() => action(id)} />
        <Button content="Close" onClick={() => setOpen(false)} />
      </Modal.Actions>
    </Modal>
  );
};
