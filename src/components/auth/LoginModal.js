import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export default () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleEmailClick = () => {
    setOpen(false);
    history.push('/login/otp');
  };

  return (
    <div>
      <Button positive onClick={() => setOpen(true)}>
        Login
      </Button>

      <Modal size={'mini'} open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Choose login method</Modal.Header>
        <Modal.Content>
          <p>I would like to login with ...</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            icon="google"
            labelPosition="left"
            content="Google"
          />
          <Button
            positive
            icon="mail"
            labelPosition="left"
            content="Email"
            onClick={handleEmailClick}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};
