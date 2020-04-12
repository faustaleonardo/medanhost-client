/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axiosInstance from 'utils/axiosInstance';

export default () => {
  const fileInputRef = useRef();
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await axiosInstance.get('/api/v1/types');
      const result = response.data;
      const roomTypes = [];

      for (const index in result) {
        roomTypes.push({
          key: index,
          value: result[index].id,
          text: result[index].value,
        });
      }
      setTypes(roomTypes);
    };

    fetchTypes();
  }, []);

  if (!types.length) return null;

  return (
    <div className="general-form">
      <h1>Create Room</h1>
      <Form>
        <Form.Group widths="equal">
          <Form.Input fluid label="Name" placeholder="Name" />
          <Form.Select
            fluid
            label="Room type"
            placeholder="Select your room type"
            options={types}
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
