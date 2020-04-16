/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { Table, Button, Rating } from 'semantic-ui-react';
import WarningModal from 'components/partials/WarningModal';
import { Redirect } from 'react-router-dom';
import { AuthContext } from 'context/auth/authState';

import axiosInstance from 'utils/axiosInstance';
import { ReviewContext } from 'context/reviews/reviewState';
import formatDate from 'utils/formatDate';

export default () => {
  const { reviews, setReviews, deleteReview } = useContext(ReviewContext);
  const { auth } = useContext(AuthContext);

  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [reviewId, setReviewId] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axiosInstance.get('/api/v1/reviews');
      const data = response.data;

      setReviews(data);
    };

    fetchReviews();
  }, []);

  const handleDeleteModal = (reviewId) => {
    setReviewId(reviewId);
    setOpenWarningModal(true);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axiosInstance.delete(`/api/v1/reviews/${reviewId}`);

      deleteReview(reviewId);
      setOpenWarningModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const renderContent = () => {
    return reviews.map((review) => {
      return (
        <Table.Row key={review.id}>
          <Table.Cell>{review.id}</Table.Cell>
          <Table.Cell>
            <div className="text-center">{review.user.id}</div>
          </Table.Cell>
          <Table.Cell>
            <div className="text-center">{review.room.id}</div>
          </Table.Cell>
          <Table.Cell>
            <Rating
              icon="star"
              defaultRating={review.ratings}
              maxRating={5}
              disabled
            />
          </Table.Cell>
          <Table.Cell>{review.comments}</Table.Cell>
          <Table.Cell>{formatDate(review.updatedAt)}</Table.Cell>
          <Table.Cell>
            <Button negative onClick={() => handleDeleteModal(review.id)}>
              Delete
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  if (!auth) return <Redirect to="/" />;
  if (!reviews.length) return null;

  return (
    <div>
      <WarningModal
        open={openWarningModal}
        setOpen={setOpenWarningModal}
        id={reviewId}
        action={handleDeleteReview}
        title={'Delete Review'}
      />

      <h1>Reviews</h1>
      <div className="mb-3r">
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell singleLine>
                <div className="text-center">Guest ID</div>
              </Table.HeaderCell>
              <Table.HeaderCell singleLine>
                <div className="text-center">Room ID</div>
              </Table.HeaderCell>
              <Table.HeaderCell>Ratings</Table.HeaderCell>
              <Table.HeaderCell>Comments</Table.HeaderCell>
              <Table.HeaderCell singleLine>
                <div className="text-center">Updated At</div>
              </Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{renderContent()}</Table.Body>
        </Table>
      </div>
    </div>
  );
};
