import React, { createContext, useReducer } from 'react';

import roomReducer from './roomReducer';

const initialState = {
  rooms: [],
};

export const RoomContext = createContext(roomReducer);
const { Provider } = RoomContext;

export const RoomProvider = ({ children }) => {
  const [state, dispatch] = useReducer(roomReducer, initialState);

  // actions
  const setRooms = async (data) => {
    dispatch({ type: 'SET_ROOMS', payload: data });
  };

  const addRoom = async (data) => {
    dispatch({ type: 'ADD_ROOM', payload: data });
  };

  const deleteRoom = async (id) => {
    dispatch({ type: 'DELETE_ROOM', payload: id });
  };

  return (
    <Provider
      value={{
        rooms: state.rooms,
        auth: state.auth,
        setRooms,
        addRoom,
        deleteRoom,
      }}
    >
      {children}
    </Provider>
  );
};
