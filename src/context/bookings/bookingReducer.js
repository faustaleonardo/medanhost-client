export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'SET_BOOKINGS':
      return { ...state, bookings: payload };
    case 'ADD_BOOKING':
      return { ...state, bookings: [...state.bookings, payload] };
    case 'UPDATE_BOOKING':
      const bookings = state.bookings.map((booking) => {
        if (booking.id === payload.id) booking[payload.id] = payload;
        return booking;
      });

      return {
        ...state,
        bookings,
      };
    default:
      return state;
  }
};
