import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Form,
  Rating,
  Comment,
  Message,
} from 'semantic-ui-react';
import axiosInstance from 'utils/axiosInstance';

export default ({ open, setOpen, id, action }) => {
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState(4);
  const [comments, setComments] = useState('');

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/reviews/rooms/${id}`);
        const review = response.data;
        if (review) {
          setRatings(review.ratings);
          setComments(review.comments);
        } else {
          setRatings('');
          setComments('');
        }
      } catch (err) {
        console.log(err.response);
      }
    };
    if (parseInt(id)) fetchReview();
  }, [id]);

  const handleSubmit = async (id) => {
    if (!comments) {
      return setError('Comment must be filled!');
    }

    const data = {
      roomId: id * 1,
      ratings: ratings * 1,
      comments,
    };
    action(data);
  };
  return (
    <Modal size={'tiny'} open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Review Room</Modal.Header>
      <Modal.Content>
        {error ? <Message negative>{error}</Message> : ''}
        <p>I would like to see review this room ...</p>
        <div className="mb-05r">
          <Rating
            maxRating={5}
            defaultRating={ratings}
            icon="star"
            size="large"
            value={ratings}
            onRate={(event, data) => setRatings(data.rating)}
          />
        </div>
        <Comment.Group>
          <Form reply>
            <Form.TextArea
              value={comments}
              onChange={(event) => setComments(event.target.value)}
            />
          </Form>
        </Comment.Group>
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={() => handleSubmit(id)}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
