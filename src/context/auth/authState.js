import React, { createContext, useReducer } from 'react';

import authReducer from './authReducer';

const initialState = {
  auth: null,
};

export const AuthContext = createContext(authReducer);
const { Provider } = AuthContext;

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // actions
  const setAuth = async (data) => {
    dispatch({ type: 'SET_AUTH', payload: data });
  };

  return (
    <Provider
      value={{
        auth: state.auth,
        setAuth,
      }}
    >
      {children}
    </Provider>
  );
};
