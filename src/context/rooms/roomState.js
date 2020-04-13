import React, { createContext, useReducer } from 'react';
import axiosInstance from 'utils/axiosInstance';

import roomReducer from './roomReducer';

const initialState = {
  rooms: [],
};

export const RoomContext = createContext(roomReducer);
const { Provider } = RoomContext;

export const RoomProvider = ({ children }) => {
  const [state, dispatch] = useReducer(roomReducer, initialState);

  // actions
  const getRooms = async () => {
    const response = await axiosInstance.get('/api/v1/rooms');
    const rooms = response.data;

    dispatch({ type: 'GET_ROOMS', payload: rooms });
  };

  const addRoom = async (data) => {
    const response = await axiosInstance.post('/api/v1/rooms', data);
    const room = response.data;

    dispatch({ type: 'ADD_ROOM', payload: room });
  };

  return (
    <Provider
      value={{
        auth: state.auth,
        getRooms,
        addRoom,
      }}
    >
      {children}
    </Provider>
  );
};
