import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Form,
  Rating,
  Comment,
  Message,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import axiosInstance from 'utils/axiosInstance';

export default ({ open, setOpen, id, action }) => {
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState(null);
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoading(true);
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
      setLoading(false);
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

  if (loading === true)
    return (
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>
    );
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
