import React, { createContext, useReducer } from 'react';

import bookmarkReducer from './bookmarkReducer';

const initialState = {
  bookmarks: [],
};

export const BookmarkContext = createContext(bookmarkReducer);
const { Provider } = BookmarkContext;

export const BookmarkProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookmarkReducer, initialState);

  // actions
  const setBookmarks = async (data) => {
    dispatch({ type: 'SET_BOOKMARKS', payload: data });
  };

  const addBookmark = async (data) => {
    dispatch({ type: 'ADD_BOOKMARK', payload: data });
  };

  const deleteBookmark = async (id) => {
    dispatch({ type: 'DELETE_BOOKMARK', payload: id });
  };

  return (
    <Provider
      value={{
        bookmarks: state.bookmarks,
        auth: state.auth,
        setBookmarks,
        addBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </Provider>
  );
};
