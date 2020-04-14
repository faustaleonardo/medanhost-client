import React, { createContext, useReducer } from 'react';

import bookingReducer from './bookingReducer';

const initialState = {
  bookings: [],
};

export const BookingContext = createContext(bookingReducer);
const { Provider } = BookingContext;

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // actions
  const setBookings = (data) => {
    dispatch({ type: 'SET_BOOKINGS', payload: data });
  };

  const addBooking = (data) => {
    dispatch({ type: 'ADD_BOOKING', payload: data });
  };

  const updateBooking = (data) => {
    dispatch({ type: 'UPDATE_BOOKING', payload: data });
  };

  return (
    <Provider
      value={{
        bookings: state.bookings,
        auth: state.auth,
        setBookings,
        addBooking,
        updateBooking,
      }}
    >
      {children}
    </Provider>
  );
};
