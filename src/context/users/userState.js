import React, { createContext, useReducer } from 'react';

import userReducer from './userReducer';

const initialState = {
  users: [],
};

export const UserContext = createContext(userReducer);
const { Provider } = UserContext;

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // actions
  const setUsers = async (data) => {
    dispatch({ type: 'SET_USERS', payload: data });
  };

  const deleteUser = async (id) => {
    dispatch({ type: 'DELETE_USER', payload: id });
  };

  return (
    <Provider
      value={{
        users: state.users,
        auth: state.auth,
        setUsers,
        deleteUser,
      }}
    >
      {children}
    </Provider>
  );
};
