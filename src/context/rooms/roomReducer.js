export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'SET_ROOMS':
      return { ...state, rooms: payload };
    case 'ADD_ROOM':
      return { ...state, rooms: [...state.rooms, payload] };
    case 'DELETE_ROOM':
      const rooms = [...state.rooms].filter((room) => room.id !== payload);
      return { ...state, rooms };
    default:
      return state;
  }
};
