export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'SET_BOOKMARKS':
      return { ...state, bookmarks: payload };
    case 'ADD_BOOKMARK':
      console.log(payload);
      return { ...state, bookmarks: [...state.bookmarks, payload] };
    case 'DELETE_BOOKMARK':
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark.id !== payload
        ),
      };
    default:
      return state;
  }
};
