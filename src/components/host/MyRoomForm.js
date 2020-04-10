import React, { useRef } from 'react';
import { Form, Button } from 'semantic-ui-react';

export default () => {
  const roomTypes = [
    { key: 'sh', value: 'sharedRoom', text: 'Shared Room' },
    { key: 'pr', value: 'privateRoom', text: 'Private Room' },
  ];

  const fileInputRef = useRef();

  return (
    <div className="general-form">
      <h1>Create Room</h1>
      <Form>
        <Form.Group widths="equal">
          <Form.Input fluid label="Name" placeholder="Check in" />
          <Form.Select
            fluid
            label="Room type"
            placeholder="Select your room type"
            options={roomTypes}
          ></Form.Select>
        </Form.Group>
        <Form.Field>
          <Form.Input label="Location" placeholder="Location" />
        </Form.Field>
        <Form.Field>
          <label>Pictures</label>
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
            // onChange={fileChange}
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Form.Input fluid label="Bedrooms" placeholder="Bedrooms" />
          <Form.Input fluid label="Beds" placeholder="Beds" />
          <Form.Input fluid label="Baths" placeholder="Baths" />
        </Form.Group>
        <Form.Field>
          <Form.TextArea label="Description" placeholder="Description" />
        </Form.Field>
        <Form.Group widths="equal">
          <Form.Input fluid label="Normal guests" placeholder="Normal guests" />
          <Form.Input fluid label="Max guests" placeholder="Max guests" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input fluid label="Price / night" placeholder="Price / night" />
          <Form.Input
            fluid
            label="Additional guest fee"
            placeholder="Additional guest fee"
          />
        </Form.Group>
        <Form.Field control={Button} positive>
          Create
        </Form.Field>
      </Form>
    </div>
  );
};

// https://stackoverflow.com/questions/55464274/react-input-type-file-semantic-ui-react
