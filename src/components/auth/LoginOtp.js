import React from 'react';
import { Button, Form } from 'semantic-ui-react';

export default () => {
  return (
    <div className="general-form center-vh">
      <Form>
        <Form.Input label="Email" placeholder="johndoe@lorem.com" />
        <Button positive>Submit</Button>
      </Form>
    </div>
  );
};
