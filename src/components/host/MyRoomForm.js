/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useRef,
  useState,
  useEffect,
  Fragment,
  useContext,
} from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import axiosInstance from 'utils/axiosInstance';
import LocationModal from './modals/LocationModal';
import { RoomContext } from 'context/rooms/roomState';
import { useHistory } from 'react-router-dom';

export default () => {
  const { addRoom } = useContext(RoomContext);
  const history = useHistory();

  const fileInputRef = useRef();
  const [types, setTypes] = useState([]);
  const [openLocation, setOpenLocation] = useState(false);
  const [error, setError] = useState(null);

  /**---------------------------start: fields-------------------------------- */
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [images, setImages] = useState('');
  const [location, setLocation] = useState('');
  const [bedrooms, setBedrooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [description, setDescription] = useState('');
  const [guests, setGuests] = useState(0);
  const [price, setPrice] = useState(0);
  /**---------------------------end: fields-------------------------------- */

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await axiosInstance.get('/api/v1/types');
      const result = response.data;
      const data = [];

      for (const index in result) {
        data.push({
          key: index,
          value: result[index].id,
          text: result[index].value,
        });
      }
      setTypes(data);
    };

    fetchTypes();
  }, []);

  const uploadFileToServer = async (roomId) => {
    const formData = new FormData();
    for (const key of Object.keys(images)) {
      formData.append('images', images[key]);
    }
    await axiosInstance.post(`/api/v1/pictures/rooms/${roomId}`, formData);
  };

  const handleCreate = async () => {
    /**---------------------------validation------------------------ */
    if (
      !name ||
      !type ||
      !images ||
      !location ||
      !bedrooms ||
      !beds ||
      !baths ||
      !description ||
      !guests ||
      !price
    ) {
      return setError('All fields must be filled!');
    }

    if (bedrooms < 0) return setError('Bedrooms must be greater than 0');
    if (beds < 0) return setError('Beds must be greater than 0');
    if (baths < 0) return setError('Baths must be greater than 0');
    if (guests < 0) return setError('Guests must be greater than 0');
    if (price < 0) return setError('Price must be greater than 0');
    /**end: ---------------------------validation------------------------ */

    const data = {
      name,
      typeId: type,
      location,
      bedrooms: bedrooms * 1,
      beds: beds * 1,
      baths: baths * 1,
      description,
      guests: guests * 1,
      price: price * 1,
    };

    try {
      const response = await axiosInstance.post('/api/v1/rooms', data);
      const room = response.data;
      addRoom(room);
      await uploadFileToServer(room.id);
      history.push('/host/rooms');
    } catch (err) {
      console.log(err.response.data);

      setError(err.response.data);
    }
  };

  if (!types.length) return null;
  return (
    <Fragment>
      <LocationModal
        open={openLocation}
        setOpen={setOpenLocation}
        location={location}
        setLocation={setLocation}
      />
      <div className="general-form">
        <h1>Create Room</h1>
        {error ? <Message negative>{error}</Message> : ''}

        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Name"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Form.Select
              fluid
              label="Room type"
              placeholder="Select your room type"
              options={types}
              onChange={(event, data) => {
                setType(data.value);
              }}
            ></Form.Select>
          </Form.Group>
          <Form.Field>
            <label>Location</label>
            {location ? (
              <p>{location}</p>
            ) : (
              <p>You have not chosen the location yet...</p>
            )}
            <Button
              onClick={() => setOpenLocation(true)}
              icon="map marker"
              labelPosition="left"
              content="Choose Location"
              className="mb-05r"
            />
          </Form.Field>
          <Form.Field>
            <label>Pictures</label>
            <p>{images.length} files</p>
            <Button
              content="Choose File"
              labelPosition="left"
              icon="file"
              onClick={() => fileInputRef.current.click()}
            />
            <input
              ref={fileInputRef}
              type="file"
              multiple
              hidden
              onChange={(event) => setImages(event.target.files)}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Bedrooms"
              placeholder="Bedrooms"
              value={bedrooms}
              onChange={(event) => setBedrooms(event.target.value)}
              type={'number'}
            />
            <Form.Input
              fluid
              label="Beds"
              placeholder="Beds"
              value={beds}
              onChange={(event) => setBeds(event.target.value)}
              type={'number'}
            />
            <Form.Input
              fluid
              label="Baths"
              placeholder="Baths"
              value={baths}
              onChange={(event) => setBaths(event.target.value)}
              type={'number'}
            />
          </Form.Group>
          <Form.Field>
            <Form.TextArea
              label="Description"
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Guests"
              placeholder="Guests"
              type={'number'}
              value={guests}
              onChange={(event) => setGuests(event.target.value)}
            />
            <Form.Input
              fluid
              label="Price per night"
              placeholder="Price per night"
              type={'number'}
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </Form.Group>
          <Form.Field control={Button} positive onClick={handleCreate}>
            Create
          </Form.Field>
        </Form>
      </div>
    </Fragment>
  );
};
