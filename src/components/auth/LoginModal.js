import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button positive onClick={() => setOpen(true)}>
        Login
      </Button>

      <Modal size={'mini'} open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Choose your login method</Modal.Header>
        <Modal.Content>
          <p>I would like to login with</p>
        </Modal.Content>
        <Modal.Actions>
          <Button positive icon="mail" labelPosition="left" content="Email" />
          <Button
            negative
            icon="google"
            labelPosition="left"
            content="Google"
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};
