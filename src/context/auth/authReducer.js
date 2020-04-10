export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_AUTH':
      return { ...state, auth: payload };
    case 'AUTH_ERROR':
      return { ...state, error: payload };
    default:
      return state;
  }
};
