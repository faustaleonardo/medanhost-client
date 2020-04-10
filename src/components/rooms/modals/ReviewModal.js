import React from 'react';
import { Modal, Button, Form, Rating, Comment } from 'semantic-ui-react';

export default ({ open, setOpen }) => {
  return (
    <Modal size={'tiny'} open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Review Room</Modal.Header>
      <Modal.Content>
        <p>I would like to see review this room ...</p>
        <div className="mb-05r">
          <Rating maxRating={5} defaultRating={4} icon="star" size="large" />
        </div>
        <Comment.Group>
          <Form reply>
            <Form.TextArea />
          </Form>
        </Comment.Group>
      </Modal.Content>
      <Modal.Actions>
        <Button positive>Save</Button>
      </Modal.Actions>
    </Modal>
  );
};
