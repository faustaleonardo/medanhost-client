export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_AUTH':
      return { ...state, auth: payload };
    default:
      return state;
  }
};
