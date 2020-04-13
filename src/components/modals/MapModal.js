import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Modal } from 'semantic-ui-react';

export default ({ open, setOpen, position }) => {
  return (
    <Modal
      basic
      size={'small'}
      open={open}
      onClose={() => setOpen(false)}
      centered={false}
    >
      <Modal.Content>
        <p>Hello</p>
        <Map center={position} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* <Marker position={position}>
            <Popup>Location</Popup>
          </Marker> */}
        </Map>
      </Modal.Content>
    </Modal>
  );
};
