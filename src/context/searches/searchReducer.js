export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'SET_SEARCH':
      return { ...state, search: payload };
    default:
      return state;
  }
};
