export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'GET_ROOMS':
      return { ...state, payload };
    case 'ADD_ROOM':
      return { ...state, rooms: [...state.rooms, payload] };
    default:
      return state;
  }
};
