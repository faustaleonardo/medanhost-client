import React from 'react';
import { Form, Button } from 'semantic-ui-react';

export default () => {
  return (
    <div className="search-form general-form center-vh">
      <Form>
        <h1>Find your room</h1>
        <Form.Field>
          <Form.Input label="Location" placeholder="Location" />
        </Form.Field>
        <Form.Group widths="equal">
          <Form.Input fluid label="Check in" placeholder="Check in" />
          <Form.Input fluid label="Check out" placeholder="Check out" />
          <Form.Input fluid label="Guests" placeholder="Guests" />
        </Form.Group>
        <Form.Field control={Button} positive>
          Search
        </Form.Field>
      </Form>
    </div>
  );
};
