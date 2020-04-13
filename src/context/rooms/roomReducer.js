export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'SET_ROOMS':
      return { ...state, rooms: payload };
    case 'ADD_ROOM':
      return { ...state, rooms: [...state.rooms, payload] };
    case 'UPDATE_ROOM':
      const rooms = state.rooms.map((room) => {
        if (room.id === payload.id) room[payload.id] = payload;
        return room;
      });

      return {
        ...state,
        rooms,
      };
    case 'DELETE_ROOM':
      return {
        ...state,
        rooms: state.rooms.filter((room) => room.id !== payload),
      };
    default:
      return state;
  }
};
