import React from 'react';
import { Modal, Button, Checkbox } from 'semantic-ui-react';

export default ({ open, setOpen }) => {
  return (
    <Modal size={'mini'} open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Choose type of place</Modal.Header>
      <Modal.Content>
        <p>I would like to have ...</p>
        <div className="py-05r">
          <Checkbox label="Private Room" />
        </div>
        <div className="py-05r">
          <Checkbox label="Shared Room" />
        </div>
        <div className="py-05r">
          <Checkbox label="Entire Apartment" />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button positive>Save</Button>
      </Modal.Actions>
    </Modal>
  );
};
