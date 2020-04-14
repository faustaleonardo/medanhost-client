import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Modal, Button } from 'semantic-ui-react';

export default ({ open, setOpen, position }) => {
  return (
    <Modal size={'small'} open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Location</Modal.Header>
      <Modal.Content>
        <Map center={position} zoom={16}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>This is the place!</Popup>
          </Marker>
        </Map>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
};
