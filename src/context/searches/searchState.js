import React, { createContext, useReducer } from 'react';

import searchReducer from './searchReducer';

const initialState = {
  search: null,
};

export const SearchContext = createContext(searchReducer);
const { Provider } = SearchContext;

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  // actions
  const setSearch = async (data) => {
    dispatch({ type: 'SET_SEARCH', payload: data });
  };

  return (
    <Provider
      value={{
        search: state.search,
        auth: state.auth,
        setSearch,
      }}
    >
      {children}
    </Provider>
  );
};
