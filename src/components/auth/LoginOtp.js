import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';

export default () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="general-form center-vh">
      <Form>
        <Form.Input label="Email" placeholder="johndoe@lorem.com" />
        <Button positive onClick={handleOpen}>
          Submit
        </Button>
      </Form>

      <Modal size={'mini'} open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Type OTP Code</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input label="OTP Code" placeholder="000000" />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={handleClose}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
