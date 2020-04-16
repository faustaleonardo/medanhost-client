export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'SET_REVIEWS':
      return { ...state, reviews: payload };
    case 'DELETE_REVIEW':
      return {
        ...state,
        reviews: state.reviews.filter((review) => review.id !== payload),
      };
    default:
      return state;
  }
};
