import React, { useState } from 'react';
import { Modal, Button, Form, Input, Message } from 'semantic-ui-react';

export default ({ open, setOpen, action }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (minPrice < 1 || maxPrice < 1) {
      return setError('Min price and Max price must be greater than 0');
    }

    if (maxPrice * 1 < minPrice * 1) {
      return setError('Max price must be greater than Min price');
    }

    action(minPrice, maxPrice);
  };

  return (
    <Modal size={'tiny'} open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Choose budget</Modal.Header>
      <Modal.Content>
        {error ? <Message negative>{error}</Message> : ''}
        <p>I would like to see the rooms with price between ... </p>
        <Form>
          <Form.Group inline>
            <Form.Field>
              <Input
                placeholder="Min price"
                value={minPrice}
                type={'number'}
                onChange={(event) => setMinPrice(event.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <Input
                placeholder="Max price"
                value={maxPrice}
                type={'number'}
                onChange={(event) => setMaxPrice(event.target.value)}
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={handleSave}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
