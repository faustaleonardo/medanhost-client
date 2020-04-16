import React, { createContext, useReducer } from 'react';

import reviewReducer from './reviewReducer';

const initialState = {
  reviews: [],
};

export const ReviewContext = createContext(reviewReducer);
const { Provider } = ReviewContext;

export const ReviewProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reviewReducer, initialState);

  // actions
  const setReviews = async (data) => {
    dispatch({ type: 'SET_REVIEWS', payload: data });
  };

  const deleteReview = async (id) => {
    dispatch({ type: 'DELETE_REVIEW', payload: id });
  };

  return (
    <Provider
      value={{
        reviews: state.reviews,
        auth: state.auth,
        setReviews,
        deleteReview,
      }}
    >
      {children}
    </Provider>
  );
};
