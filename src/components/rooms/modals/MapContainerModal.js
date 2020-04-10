import React from 'react';
import { Modal } from 'semantic-ui-react';
import MapContainer from 'components/partials/MapContainer';

export default ({ open, setOpen }) => {
  return (
    <Modal
      basic
      size={'small'}
      open={open}
      onClose={() => setOpen(false)}
      centered={false}
    >
      <Modal.Content>
        <MapContainer />
      </Modal.Content>
    </Modal>
  );
};
